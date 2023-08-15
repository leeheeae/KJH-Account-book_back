import { IFindByIdInput, IFindByIdOutput } from './dto/find-by-id.dto';
import { IJwtService } from './../libs/jwt/interface/jwt-service.interface';
import { I_JWT_SERVICE } from './../common/constants/service/service-interface.constant';
import { LoginError, RegisterTryCatch, ValueOfRegisterError } from '../common/response/try-catch/try-catch.response';
import { FIND_BY_ID_ERROR, REGISTER_ERROR } from '../common/response/error/user-error.response';
import { Inject, Injectable } from '@nestjs/common';
import { ILoginInput, ILoginOutputData } from './dto/login.dto';
import { FindByEmailTryCatch, LoginTryCatch } from 'src/common/response/try-catch/try-catch.response';
import { LOGIN_ERROR } from 'src/common/response/error/user-error.response';
import { ResultResponse } from 'src/common/response/success/success.response';
import { IUsersService } from './interface/user-service.interface';
import { UserRepository } from './repository/user.repository';
import { IFindByEmailInput } from './dto/find-by-email.dto';
import { IRegisterInput } from './dto/register.dto';
import { User } from '@prisma/client';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(I_JWT_SERVICE) private readonly jwtService: IJwtService,
  ) {}
  async findById({
    userId,
  }: IFindByIdInput): Promise<FindByEmailTryCatch<IFindByIdOutput, typeof FIND_BY_ID_ERROR.NOT_FOUND_USER>> {
    const start = Date.now();
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return FIND_BY_ID_ERROR.NOT_FOUND_USER;
    }

    return ResultResponse({
      success: true,
      requestToResponse: `${Date.now() - start}ms`,
      message: {
        text: '아이디로 유저 찾기 성공',
        statusCode: 200,
      },
      data: user,
    });
  }

  async findByEmail(
    findByEmailInput: IFindByEmailInput,
  ): Promise<FindByEmailTryCatch<User, typeof FIND_BY_ID_ERROR.NOT_FOUND_USER>> {
    const start = Date.now();

    const user = await this.userRepository.findByEmail(findByEmailInput);

    if (!user) {
      return FIND_BY_ID_ERROR.NOT_FOUND_USER;
    }

    return ResultResponse({
      success: true,
      requestToResponse: `${Date.now() - start}ms`,
      message: {
        text: '이메일로 유저 찾기 성공',
        statusCode: 200,
      },
      data: user,
    });
  }

  async login(loginInput: ILoginInput): Promise<LoginTryCatch<ILoginOutputData, LoginError[keyof LoginError]>> {
    const start = Date.now();

    const loginResponse = await this.userRepository.login(loginInput);

    if (_.isEqual(loginResponse, LOGIN_ERROR.NOT_EXIST_USER)) return LOGIN_ERROR.NOT_EXIST_USER;
    if (_.isEqual(loginResponse, LOGIN_ERROR.IS_NOT_VALID_PASSWORD)) return LOGIN_ERROR.IS_NOT_VALID_PASSWORD;

    const user = loginResponse as User;

    const token = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.refreshSign({ id: user.id });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.saveToken({ user, refreshToken });

    return ResultResponse({
      success: true,
      requestToResponse: `${Date.now() - start}ms`,
      message: {
        text: '로그인 성공',
        statusCode: 200,
      },
      data: {
        token,
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async register(registerInput: IRegisterInput): Promise<RegisterTryCatch<null, ValueOfRegisterError>> {
    const start = Date.now();
    const { email } = registerInput;
    const existUser = await this.userRepository.findByEmail({ email });

    if (existUser) {
      return REGISTER_ERROR.ALREADY_EXIST_USER;
    }
    await this.userRepository.register(registerInput);

    return ResultResponse({
      success: true,
      requestToResponse: `${Date.now() - start}ms`,
      message: {
        text: '회원가입 성공',
        statusCode: 201,
      },
      data: null,
    });
  }
}
