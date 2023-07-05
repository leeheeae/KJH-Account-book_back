import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersService } from './interface/user-service.interface';
import * as winston from 'winston';
import * as chalk from 'chalk';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { IJwtService } from 'src/libs/jwt/interface/jwt-service.interface';
import { ILoggerService } from 'src/libs/logger/interface/logger-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { USER_SUCCESS } from 'src/common/constants/success.constant';
import { COMMON_ERROR, USER_ERROR } from 'src/common/constants/error.constant';
import { FindByEmailOutput } from './dto/find-by-email.dto';
import { JoinInput, JoinOutput } from './dto/join.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { FindByIdOutput } from './dto/find-by-id.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject('IJwtService') private readonly jwtService: IJwtService,
    @Inject('ILoggerService') private readonly log: ILoggerService,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  successLogger(service: { name: string }, method: string, message: string): winston.Logger {
    const colorServiceName = chalk.yellow(`${service.name}`);
    const colorName = chalk.cyan(`[Method Name] :`);
    const colorMethod = chalk.yellow(`${this[`${method}`].name}()`);
    const ERROR = 'ERROR';
    if (!message.includes(ERROR)) {
      const colorMessage = chalk.green(`${message}`);
      return this.log
        .logger()
        .info(`${colorServiceName} => ${colorName} ${colorMethod} | [Success Message] ::: ${colorMessage}`);
    } else {
      const colorMessage = chalk.red(`${message}`);
      return this.log
        .logger()
        .error(`${colorServiceName} => ${colorName} ${colorMethod} | [Fail Message] ::: ${colorMessage}`);
    }
  }

  async getFindById(userId: number): Promise<FindByIdOutput> {
    try {
      const user = await this.users.findOneOrFail({
        where: { id: userId },
      });

      //* success
      return {
        ok: true,
        message: { text: USER_SUCCESS.getFindById.text, statusCode: HttpStatus.OK },
        data: {
          user,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async getFindByEmail(email: string): Promise<FindByEmailOutput> {
    try {
      const user = await this.users.findOneOrFail({
        where: { email },
      });
      //* success
      return {
        ok: true,
        message: {
          text: USER_SUCCESS.getFindByEmail.text,
          statusCode: HttpStatus.OK,
        },
        data: { user },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async postJoin({ name, email, password, confirmationPassword, phoneNum }: JoinInput): Promise<JoinOutput> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (password !== confirmationPassword) {
        // ! 사용자가 password와 confirmationPassword 다르게 입력하였을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.notMatchedPasswords.error),
          message: {
            text: USER_ERROR.notMatchedPasswords.text,
            statusCode: HttpStatus.UNAUTHORIZED,
          },
        };
      }

      const exists = await this.users.findOne({ where: [{ email }, { phoneNum }] });

      if (exists) {
        // ! 이미 존재하는 사용자가 있을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.existUser.error),
          message: {
            text: USER_ERROR.existUser.text,
            statusCode: HttpStatus.UNAUTHORIZED,
          },
        };
      }

      const user = this.users.create({
        name,
        email,
        password,
        phoneNum,
      });

      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      //* success
      return {
        ok: true,
        message: {
          text: USER_SUCCESS.postJoin.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      await queryRunner.commitTransaction();
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    } finally {
      await queryRunner.release();
    }
  }

  async postLogin({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOneBy({ email });
      if (!user) {
        // ! 사용자가 존재하지 않는 이메일을 입력하였을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.notExistUser.error),
          message: {
            text: USER_ERROR.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        // ! 잘못된 비밀번호를 입력했을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.wrongPassword.error),
          message: {
            text: USER_ERROR.wrongPassword.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      // todo : 이메일 인증 기능 추가
      //   if (!user.verified) {
      //     return {
      //       ok: false,
      //       error: new Error(USER_ERROR.notVerifiedUser.error),
      //       message: {
      //         text: USER_ERROR.notVerifiedUser.text,
      //         statusCode: HttpStatus.BAD_REQUEST,
      //       },
      //     };
      //   }

      delete user.password;
      const token = this.jwtService.sign({ id: user.id });

      const refreshToken = this.jwtService.refreshSign({ id: user.id });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      user.refreshToken = refreshToken;

      await this.users.save(user);
      //* success
      return {
        ok: true,
        message: {
          text: USER_SUCCESS.postLogin.text,
          statusCode: HttpStatus.OK,
        },
        data: {
          token,
          refreshToken: hashedRefreshToken,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
}
