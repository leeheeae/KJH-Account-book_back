import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IAppService } from './app-service.interface';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { USER_ERROR, COMMON_ERROR } from './common/constants/error.constant';
import { USER_SUCCESS_RESPONSE } from './common/constants/swagger/user/user-success-response.constant';
import { USER_ERROR_RESPONSE } from './common/constants/swagger/user/user-error-response.constant';
import { USER_BODY_OBJECT } from './common/constants/swagger/user/user-body-object.constant';
import { USER_BODY_DESCRIPTION } from './common/constants/swagger/user/user-body-description.constant';
import { USER_OPERATION } from './common/constants/swagger/user/user-operation.constant';
import { JoinInput, JoinOutput } from './users/dto/join.dto';
import { LoginInput, LoginOutput } from './users/dto/login.dto';
import { USER_SUCCESS } from './common/constants/success.constant';
import { IUsersService } from './users/interface/user-service.interface';
import { I_APP_SERVICE, I_USERS_SERVICE } from './common/constants/service/service.constant';

@Controller()
export class AppController {
  constructor(
    @Inject(I_USERS_SERVICE) private readonly userService: IUsersService,
    @Inject(I_APP_SERVICE) private readonly appService: IAppService,
  ) {}

  @Get()
  getHello(): { title: string } {
    return this.appService.getHello();
  }

  // ! 회원가입 API [성공 & 실패 케이스 완료]
  @Post('/join')
  @ApiOperation({ summary: USER_OPERATION.join.summary, description: USER_OPERATION.join.description })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.join.text,
    schema: USER_SUCCESS_RESPONSE.join,
    status: HttpStatus.OK,
    type: JoinOutput,
  })
  // ? 401 에러 케이스
  @ApiUnauthorizedResponse({
    description: USER_ERROR.notMatchedPasswords.text,
    schema: USER_ERROR_RESPONSE.join.unauthorized,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: USER_ERROR.existUser.text,
    schema: USER_ERROR_RESPONSE.join.badRequest,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  // 요청 바디
  @ApiBody({
    description: USER_BODY_DESCRIPTION.join.description,
    schema: USER_BODY_OBJECT.join,
    type: JoinInput,
  })
  @HttpCode(HttpStatus.OK)
  async join(@Body() joinInput: JoinInput): Promise<JoinOutput> {
    return this.userService.join(joinInput);
  }

  // ! 로그인 API [성공 & 실패 케이스 완료]
  @Post('/login')
  @ApiOperation({ summary: USER_OPERATION.login.summary, description: USER_OPERATION.login.description })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.login.text,
    schema: USER_SUCCESS_RESPONSE.login,
    status: HttpStatus.OK,
    type: LoginOutput,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: USER_ERROR.notExistUser.text,
    schema: USER_ERROR_RESPONSE.login.badRequest,
  })
  // ? 401 에러 케이스
  @ApiUnauthorizedResponse({
    description: USER_ERROR.wrongPassword.text,
    schema: USER_ERROR_RESPONSE.login.unauthorized,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  // 요청 바디
  @ApiBody({
    description: USER_BODY_DESCRIPTION.login.description,
    schema: USER_BODY_OBJECT.login,
    type: LoginInput,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }
}
