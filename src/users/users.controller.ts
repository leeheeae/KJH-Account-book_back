import { LoginTryCatch } from './../common/response/try-catch/try-catch.response';
import { I_USERS_SERVICE } from './../common/constants/service/service-interface.constant';
import { FindByIdTryCatch, JoinTryCatch, JoinValueError } from '../common/response/try-catch/try-catch.response';
import { FIND_BY_ID_ERROR, LOGIN_ERROR } from '../common/response/error/user-error.response';
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

  @TypedRoute.Post('owner')
  async findById(
    @AuthUser() authUser: User,
  ): Promise<FindByIdTryCatch<IFindByIdOutput, typeof FIND_BY_ID_ERROR.NOT_FOUND_USER>> {
    return this.usersService.findById({ userId: authUser.id });
  }

  @TypedRoute.Post('login')
  async login(
    @TypedBody() loginInput: ILoginInput,
  ): Promise<
    LoginTryCatch<ILoginOutputData, typeof LOGIN_ERROR.ALREADY_EXIST_USER | typeof LOGIN_ERROR.IS_NOT_VALID_PASSWORD>
  > {
    return this.usersService.login(loginInput);
  }

  @TypedRoute.Post('join')
  async join(@TypedBody() joinInput: IJoinInput): Promise<JoinTryCatch<null, JoinValueError>> {
    return this.usersService.join(joinInput);
  }
}
