import { FIND_BY_EMAIL_ERROR, FIND_BY_ID_ERROR, LOGIN_ERROR } from '../../common/response/error/user-error.response';
import {
  FindByEmailTryCatch,
  FindByIdTryCatch,
  LoginTryCatch,
  RegisterTryCatch,
  ValueOfRegisterError,
} from '../../common/response/try-catch/try-catch.response';
import { ILoginInput, ILoginOutputData } from '../dto/login.dto';
import { IFindByEmailInput } from '../dto/find-by-email.dto';
import { IRegisterInput } from '../dto/register.dto';
import { User } from '@prisma/client';
import { IFindByIdInput, IFindByIdOutput } from '../dto/find-by-id.dto';

export interface IUsersService {
  findById(findByIdInput: IFindByIdInput): Promise<FindByIdTryCatch<IFindByIdOutput, typeof FIND_BY_ID_ERROR.NOT_FOUND_USER>>;
  findByEmail(findByEmailInput: IFindByEmailInput): Promise<FindByEmailTryCatch<User, typeof FIND_BY_EMAIL_ERROR.NOT_FOUND_USER>>;
  login(
    loginInput: ILoginInput,
  ): Promise<LoginTryCatch<ILoginOutputData, typeof LOGIN_ERROR.ALREADY_EXIST_USER | typeof LOGIN_ERROR.IS_NOT_VALID_PASSWORD>>;
  register(registerInput: IRegisterInput): Promise<RegisterTryCatch<null, ValueOfRegisterError>>;
}
