export const USER_BODY_OBJECT = {
  // ! [join] 에 대한 Body
  join: {
    example: {
      name: '정빈',
      email: 'animalBack@naver.com',
      password: 'animalBack123!@',
      confirmationPassword: 'animalBack123!@',
      region: '서울',
      phoneNum: '010-1234-5678',
    },
  },
  // ! [login] 에 대한 Body
  login: {
    example: {
      email: 'animalBack@naver.com',
      password: 'animalBack123!@',
    },
  },
} as const;
