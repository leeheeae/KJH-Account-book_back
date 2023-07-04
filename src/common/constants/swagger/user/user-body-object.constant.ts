export const USER_BODY_OBJECT = {
  // ! [postLogin] 에 대한 Body
  postLogin: {
    example: {
      email: 'animalBack@naver.com',
      password: 'animalBack123!@',
    },
  },
  // ! [postJoin] 에 대한 Body
  postJoin: {
    example: {
      name: '정빈',
      email: 'animalBack@naver.com',
      password: 'animalBack123!@',
      confirmationPassword: 'animalBack123!@',
      region: '서울',
      phoneNum: '010-1234-5678',
    },
  },
} as const;
