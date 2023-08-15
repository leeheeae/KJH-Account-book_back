import { User } from '@prisma/client';

export interface IFindByEmailInput {
  /**
   * @format email
   */
  email: string;
}

export interface IFindByEmailOutput extends User {}
