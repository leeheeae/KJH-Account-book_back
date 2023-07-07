import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersService } from './interface/user-service.interface';
import * as winston from 'winston';
import * as chalk from 'chalk';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { IJwtService } from 'src/libs/jwt/interface/jwt-service.interface';
import { ILoggerService } from 'src/libs/logger/interface/logger-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { USER_SUCCESS } from 'src/common/constants/success.constant';
import { COMMON_ERROR } from 'src/common/constants/error.constant';
import { FindByEmailOutput } from './dto/find-by-email.dto';
import { JoinInput, JoinOutput } from './dto/join.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { FindByIdOutput } from './dto/find-by-id.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject('IJwtService') private readonly jwtService: IJwtService,
    @Inject('ILoggerService') private readonly log: ILoggerService,
    @InjectRepository(User) private readonly usersRepository: UsersRepository,
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

  async findById(userId: number): Promise<FindByIdOutput> {
    try {
      const user = await this.usersRepository.findById(userId);

      //* success
      return {
        ok: true,
        message: { text: USER_SUCCESS.findById.text, statusCode: HttpStatus.OK },
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

  async findByEmail(email: string): Promise<FindByEmailOutput> {
    try {
      const user = await this.usersRepository.findByEmail(email);
      //* success
      return {
        ok: true,
        message: {
          text: USER_SUCCESS.findByEmail.text,
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

  async join(joinInput: JoinInput): Promise<JoinOutput> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.usersRepository.join(joinInput);

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      //* success
      return {
        ok: true,
        message: {
          text: USER_SUCCESS.join.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
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

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.usersRepository.verifiedUserData(loginInput).then(result => {
        delete result.password;
        return result;
      });

      const token = this.jwtService.sign({ id: user.id });

      const refreshToken = this.jwtService.refreshSign({});

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      await this.usersRepository.saveToken({ user, refreshToken });

      //* success
      return {
        ok: true,
        message: {
          text: USER_SUCCESS.login.text,
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
