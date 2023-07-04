import * as winston from 'winston';
import { JoinInput, JoinOutput } from '../dto/join.dto';
import { LoginInput, LoginOutput } from '../dto/login.dto';

export interface IUsersService {
  successLogger: (service: { name: string }, method: string, message: string) => winston.Logger;
  postJoin: (joinInput: JoinInput) => Promise<JoinOutput>;
  postLogin: (loginInput: LoginInput) => Promise<LoginOutput>;
}
