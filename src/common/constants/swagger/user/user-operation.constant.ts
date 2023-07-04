export const USER_OPERATION = {
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
