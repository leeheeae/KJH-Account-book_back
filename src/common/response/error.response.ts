import { HttpStatus } from '@nestjs/common';
import { COMMON_ERROR } from '../constants/error.constant';

interface IResultError {
  error: string;
  text?: string;
  statusCode?: number;
}

export const resultError = ({ error, text, statusCode }: IResultError) => {
  return {
    ok: false,
    error: new Error(error),
    message: {
      text: text ? text : COMMON_ERROR.extraError.text,
      statusCode: statusCode ? statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
    },
  };
};
