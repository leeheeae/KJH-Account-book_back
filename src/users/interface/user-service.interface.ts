import * as winston from 'winston';
import { JoinInput, JoinOutput } from '../dto/join.dto';
import { LoginInput, LoginOutput } from '../dto/login.dto';
import { FindByEmailOutput } from '../dto/find-by-email.dto';
import { FindByIdOutput } from '../dto/find-by-id.dto';

export interface IUsersService {
  successLogger: (service: { name: string }, method: string, message: string) => winston.Logger;
  getFindById(userId: number): Promise<FindByIdOutput>;
  getFindByEmail: (email: string) => Promise<FindByEmailOutput>;
  postJoin: (joinInput: JoinInput) => Promise<JoinOutput>;
  postLogin: (loginInput: LoginInput) => Promise<LoginOutput>;
}
