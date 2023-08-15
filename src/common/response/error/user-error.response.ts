import { IErrorResponse } from '../interface/error.interface';

export const LOGIN_ERROR: Record<string, IErrorResponse<'NOT_EXIST_USER' | 'IS_NOT_VALID_PASSWORD'>> = {
  NOT_EXIST_USER: {
    success: false,
    message: {
      text: '존재하지 않는 유저 입니다.',
      statusCode: 400,
    },
    data: 'NOT_EXIST_USER',
  },
  IS_NOT_VALID_PASSWORD: {
    success: false,
    message: {
      text: '비밀번호가 일치하지 않습니다.',
      statusCode: 400,
    },
    data: 'IS_NOT_VALID_PASSWORD',
  },
};

export const FIND_BY_EMAIL_ERROR: Record<string, IErrorResponse<'NOT_FOUND_USER'>> = {
  NOT_FOUND_USER: {
    success: false,
    message: {
      text: '존재하지 않는 유저입니다.',
      statusCode: 400,
    },
    data: 'NOT_FOUND_USER',
  },
};

export const FIND_BY_ID_ERROR: Record<string, IErrorResponse<'NOT_FOUND_USER'>> = {
  NOT_FOUND_USER: {
    success: false,
    message: {
      text: '존재하지 않는 유저입니다.',
      statusCode: 400,
    },
    data: 'NOT_FOUND_USER',
  },
};

export const JOIN_ERROR: Record<string, IErrorResponse<'ALREADY_EXIST_USER'>> = {
  ALREADY_EXIST_USER: {
    success: false,
    message: {
      text: '이미 존재하는 유저입니다.',
      statusCode: 400,
    },
    data: 'ALREADY_EXIST_USER',
  },
};
