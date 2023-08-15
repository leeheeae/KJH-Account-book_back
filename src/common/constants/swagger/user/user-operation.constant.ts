export const USER_OPERATION = {
  // ! [findByEmail] 에 대한 Operation
  findById: {
    summary: '소유자 호출 API',
    description: '소유자를 호출 합니다.',
  },
  // ! [join] 에 대한 Operation
  join: {
    summary: '회원가입 API',
    description: '회원가입을 위한 API 입니다.',
  },

  // ! [login] 에 대한 Operation
  login: {
    summary: '로그인 API',
    description: '로그인을 위한 API 입니다.',
  },
} as const;
