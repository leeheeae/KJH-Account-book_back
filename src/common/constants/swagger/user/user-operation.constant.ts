export const USER_OPERATION = {
  // ! [getFindByEmail] 에 대한 Operation
  getFindById: {
    summary: '소유자 호출 API',
    description: '소유자를 호출 합니다.',
  },
  // ! [postJoin] 에 대한 Operation
  postJoin: {
    summary: '회원가입 API',
    description: '회원가입을 위한 API 입니다.',
  },

  // ! [postLogin] 에 대한 Operation
  postLogin: {
    summary: '로그인 API',
    description: '로그인을 위한 API 입니다.',
  },
} as const;
