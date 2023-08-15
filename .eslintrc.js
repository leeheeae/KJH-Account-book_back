module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'filename-rules'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js', 'assets/*', 'src/types/*'],
  rules: {
    // ! file 들을 생성할때 kebab-case 를 사용하지 않으면 경고를 발생시킵니다.
    'filename-rules/match': [
      2,
      {
        '.js': /^([a-z]+-)*[a-z]+(?:\..*)?$/,
        '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/,
        '.tsx': /^([a-z]+-)*[a-z]+(?:\..*)?$/,
      },
    ],

    // ! 사용되지 않는 변수에 대한 경고를 무시합니다.
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'spaced-comment': 'warn', // !  주석 처음 시작할 때 공백을 사용하지 않으면 경고를 발생시킵니다.
    quotes: ['error', 'single', { allowTemplateLiterals: true }], // ! 따옴표 사용 & 템플릿 리터럴 허용
    'no-duplicate-imports': 'error', // ! 중복된 import 를 사용하면 에러를 발생시킵니다.
    '@typescript-eslint/no-empty-function': 'warn', // ! 빈 함수를 사용하면 경고를 발생시킵니다.
    // ! ts-ignore, ts-expect-error, ts-nocheck, ts-check 를 사용하면 에러를 발생시킵니다.
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
        minimumDescriptionLength: 3,
      },
    ],
    '@typescript-eslint/no-use-before-define': 'error', // ! 변수를 선언하기 전에 사용하면 에러를 발생시킵니다.

    '@typescript-eslint/interface-name-prefix': 'off', // ! interface 이름에 I를 사용하지 않으면 경고를 발생시킵니다.
    '@typescript-eslint/explicit-function-return-type': 'off', // ! 함수의 반환 타입을 명시하지 않으면 경고를 발생시킵니다.
    '@typescript-eslint/no-use-before-define': 'off', // ! 변수를 선언하기 전에 사용하지 않으면 경고를 발생시킵니다.
    '@typescript-eslint/ban-types': 'off', // ! 타입을 사용하지 않으면 경고를 발생시킵니다.
    '@typescript-eslint/no-empty-interface': 'off', // ! 빈 interface 를 사용하면 경고를 발생시킵니다.

    '@typescript-eslint/no-var-requires': 'off', // ? require 를 사용해도 경고를 발생시키지 않습니다.

    '@typescript-eslint/explicit-member-accessibility': 'off', // ? 클래스 멤버 접근 제한자를 사용하지 않아도 경고를 발생시키지 않습니다.
    '@typescript-eslint/no-parameter-properties': 'off', // ? 생성자의 매개변수에 접근 제한자를 사용하지 않아도 경고를 발생시키지 않습니다.
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ? 모듈의 반환 타입을 명시하지 않아도 경고를 발생시키지 않습니다.
  },
};
