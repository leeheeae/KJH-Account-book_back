import { HttpStatus } from '@nestjs/common';
// ! USER RESPONSE
export const USER_SUCCESS_RESPONSE = {
  getFindById: {
    example: {
      ok: true,
      message: {
        text: '소유자 호출 성공',
        statusCode: HttpStatus.OK,
      },
      user: {
        id: 1,
        email: 'jeongbin@naver.com',
        avatar: 'avatar',
        socialOnly: false,
        phoneNum: '010-1234-5678',
        region: '서울',
        role: 'User',
        refreshToken: 'refreshToken',
        verified: true,
        createdAt: '2021-08-01T00:00:00.000Z',
        updatedAt: '2021-08-01T00:00:00.000Z',
      },
    },
  },
  getFindByEmail: {
    example: {
      ok: true,
      message: {
        text: '이메일 조회 성공',
        statusCode: HttpStatus.OK,
      },
      user: {
        id: 1,
        email: 'animalBack@naver.com',
        avatar: 'avatar',
        socialOnly: false,
        phoneNum: '010-1234-5678',
        address: '서울',
        role: 'User',
        refreshToken: 'refreshToken',
        verified: true,
        createdAt: '2021-08-01T00:00:00.000Z',
        updatedAt: '2021-08-01T00:00:00.000Z',
      },
    },
  },
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
