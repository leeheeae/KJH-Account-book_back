export const USER_ERROR = {
  existUser: {
    error: 'existUser',
    text: '이미 존재하는 유저 입니다.',
  },
  notExistUser: {
    error: 'notExistUser',
    text: '존재하지 않는 이메일[유저] 입니다.',
  },
  notMatchedPasswords: {
    error: 'notMatchedPasswords',
    text: '비밀번호와 확인 비밀번호가 일치 하지 않습니다.',
  },
  wrongPassword: {
    error: 'wrongPassword',
    text: '비밀번호가 일치하지 않습니다.',
  },
  notExistVerification: {
    error: 'notExistVerification',
    text: '존재하지 않는 인증번호 입니다.',
  },
  notVerifiedUser: {
    error: 'notVerifiedUser',
    text: '이메일 인증이 되지 않은 유저 입니다.',
  },
} as const;

export const COMMON_ERROR = {
  extraError: {
    error: 'extraError',
    text: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
} as const;
