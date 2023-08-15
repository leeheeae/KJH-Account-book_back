import { HttpStatus } from '@nestjs/common';
import { COMMON_ERROR } from '../constants/error.constant';

export const resultError = (error: unknown) => {
  const typedError = error as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    ok: false,
    error: new Error(typedError?.response ? typedError?.response?.text : typedError),
    message: {
      text: typedError?.response?.text ? typedError?.response?.text : COMMON_ERROR.extraError.text,
      statusCode: typedError?.response?.error ? typedError?.response?.error : HttpStatus.INTERNAL_SERVER_ERROR,
    },
  };
};
