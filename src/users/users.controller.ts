import { Controller, Get, HttpCode, HttpStatus, Inject, UseFilters } from '@nestjs/common';
import { IUsersService } from './interface/user-service.interface';
import { AuthForbiddenException } from 'src/libs/auth/auth.filter';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { USER_OPERATION } from 'src/common/constants/swagger/user/user-operation.constant';
import { USER_SUCCESS } from 'src/common/constants/success.constant';
import { USER_SUCCESS_RESPONSE } from 'src/common/constants/swagger/user/user-success-response.constant';
import { FindByIdOutput } from './dto/find-by-id.dto';
import { COMMON_ERROR } from 'src/common/constants/error.constant';
import { USER_ERROR_RESPONSE } from 'src/common/constants/swagger/user/user-error-response.constant';
import { USER_PARAM_OBJECT } from 'src/common/constants/swagger/user/user-param-object.constant';
import { AuthUser } from 'src/libs/auth/auth-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(@Inject('IUsersService') private readonly userService: IUsersService) {}
  // ! 소유자 호출 API [성공 & 실패 케이스 완료]
  @Get('/owner')
  @UseFilters(AuthForbiddenException)
  @ApiOperation({
    summary: USER_OPERATION.findById.summary,
    description: USER_OPERATION.findById.description,
  })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.findById.text,
    schema: USER_SUCCESS_RESPONSE.findById,
    status: HttpStatus.OK,
    type: FindByIdOutput,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  @ApiParam(USER_PARAM_OBJECT.findById)
  @HttpCode(HttpStatus.OK)
  async findById(@AuthUser() authUser: User): Promise<FindByIdOutput> {
    return this.userService.findById(authUser.id);
  }
}
