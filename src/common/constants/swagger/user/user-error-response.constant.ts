import { HttpStatus } from '@nestjs/common';
export const USER_ERROR_RESPONSE = {
  postJoin: {
    badRequest: {
      example: {
        ok: false,
        error: 'existUser',
        message: {
          text: '이미 존재하는 유저일 경우 에러',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },
    unauthorized: {
      example: {
        ok: false,
        error: 'wrongPassword',
        message: {
          text: '비밀번호가 일치하지 않을 경우',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
    },
  },
  postLogin: {
    badRequest: {
      example: {
        ok: false,
        error: 'existUser',
        message: {
          text: '존재하지 않는 유저일 경우 에러',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },
    unauthorized: {
      example: {
        ok: false,
        error: 'wrongPassword',
        message: {
          text: '잘못된 비밀번호를 입력했을 경우',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
    },
  },
  // ! internalServerError
  internalServerError: {
    example: {
      ok: false,
      error: 'internalServerError',
      message: {
        text: '서버 내부 에러',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    },
  },
} as const;
