import { User } from '@prisma/client';

export interface IFindByIdInput {
  /**
   * @type int
   * @minimum 1
   */
  userId: number;
}

export interface IFindByIdOutput extends User {}
