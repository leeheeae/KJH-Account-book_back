import { HttpStatus } from '@nestjs/common';
// ! USER RESPONSE
export const USER_SUCCESS_RESPONSE = {
  // ! [postJoin] 에 대한 Response
  postJoin: {
    example: {
      ok: true,
      message: {
        text: '회원가입 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
  // ! [postLogin] 에 대한 Response
  postLogin: {
    example: {
      ok: true,
      message: {
        text: '로그인 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
} as const;
