import {
  FindByEmailTryCatch,
  FindByIdTryCatch,
  LoginTryCatch,
  JoinTryCatch,
  JoinValueError,
  LoginValueError,
  FindByEmailValueError,
  FindByIdValueError,
} from '../../common/response/try-catch/try-catch.response';
import { ILoginInput, ILoginOutputData } from '../dto/login.dto';
import { IFindByEmailInput, IFindByEmailOutput } from '../dto/find-by-email.dto';
import { IJoinInput } from '../dto/join.dto';
import { IFindByIdInput, IFindByIdOutput } from '../dto/find-by-id.dto';

export interface IUsersService {
  findById(findByIdInput: IFindByIdInput): Promise<FindByIdTryCatch<IFindByIdOutput, FindByIdValueError>>;
  findByEmail(
    findByEmailInput: IFindByEmailInput,
  ): Promise<FindByEmailTryCatch<IFindByEmailOutput, FindByEmailValueError>>;
  login(loginInput: ILoginInput): Promise<LoginTryCatch<ILoginOutputData, LoginValueError>>;
  join(joinInput: IJoinInput): Promise<JoinTryCatch<null, JoinValueError>>;
}
