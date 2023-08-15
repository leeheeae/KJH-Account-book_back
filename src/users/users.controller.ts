import { FindByIdValueError, LoginTryCatch, LoginValueError } from './../common/response/try-catch/try-catch.response';
import { I_USERS_SERVICE } from './../common/constants/service/service-interface.constant';
import { FindByIdTryCatch, JoinTryCatch, JoinValueError } from '../common/response/try-catch/try-catch.response';
import { AuthUser } from './../libs/auth/auth-user.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Inject } from '@nestjs/common';
import { ILoginInput, ILoginOutputData } from './dto/login.dto';
import { IUsersService } from './interface/user-service.interface';
import { IJoinInput } from './dto/join.dto';
import { IFindByIdOutput } from './dto/find-by-id.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(@Inject(I_USERS_SERVICE) private readonly usersService: IUsersService) {}

  /**
   * * 유저 아이디로 유저 찾기
   * @param authUser 유저 아이디
   * @returns 유저 정보
   *
   * @tag User
   * @summary 유저 아이디로 유저 찾기 API (로그인 필요)
   * @throws FIND_BY_ID_ERROR.NOT_FOUND_USER
   */
  @TypedRoute.Post('owner')
  async findById(@AuthUser() authUser: User): Promise<FindByIdTryCatch<IFindByIdOutput, FindByIdValueError>> {
    return this.usersService.findById({ userId: authUser.id });
  }

  /**
   * * 로그인
   * @param loginInput 로그인 정보
   * @returns 로그인 결과
   *
   * @tag User
   * @summary 로그인 API
   * @throws LOGIN_ERROR.NOT_EXIST_USER
   * @throws LOGIN_ERROR.IS_NOT_VALID_PASSWORD
   */
  @TypedRoute.Post('login')
  async login(@TypedBody() loginInput: ILoginInput): Promise<LoginTryCatch<ILoginOutputData, LoginValueError>> {
    return this.usersService.login(loginInput);
  }

  /**
   * * 회원가입
   * @param joinInput 가입 정보
   * @returns 가입 결과
   *
   * @tag User
   * @summary 회원가입 API
   * @throws JOIN_ERROR.ALREADY_EXIST_EMAIL
   */
  @TypedRoute.Post('join')
  async join(@TypedBody() joinInput: IJoinInput): Promise<JoinTryCatch<null, JoinValueError>> {
    return this.usersService.join(joinInput);
  }
}
