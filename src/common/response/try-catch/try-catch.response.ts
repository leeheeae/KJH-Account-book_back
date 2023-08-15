import { FIND_BY_EMAIL_ERROR, FIND_BY_ID_ERROR, LOGIN_ERROR, JOIN_ERROR } from '../error/user-error.response';
import { ISuccessResponse } from '../interface/success.interface';

export type Try<T> = ISuccessResponse<T>;

// * LOGIN_ERROR | 로그인 에러 상수
export type LoginError = Pick<typeof LOGIN_ERROR, keyof typeof LOGIN_ERROR>;
export type LoginValueError = LoginError[keyof LoginError];
export type LoginTryCatch<T, E extends LoginValueError> = ISuccessResponse<T> | E;

// * FIND_BY_ID_ERROR | 아이디 찾기 에러 상수
export type FindByIdError = Pick<typeof FIND_BY_ID_ERROR, keyof typeof FIND_BY_ID_ERROR>;
export type FindByIdValueError = FindByIdError[keyof FindByIdError];
export type FindByIdTryCatch<T, E extends FindByIdValueError> = ISuccessResponse<T> | E;

// * FIND_BY_EMAIL_ERROR | 이메일 찾기 에러 상수
export type FindByEmailError = Pick<typeof FIND_BY_EMAIL_ERROR, keyof typeof FIND_BY_EMAIL_ERROR>;
export type FindByEmailValueError = FindByEmailError[keyof FindByEmailError];
export type FindByEmailTryCatch<T, E extends FindByEmailValueError> = ISuccessResponse<T> | E;

// * REGISTER_ERROR | 회원가입 에러 상수
export type JoinError = Pick<typeof JOIN_ERROR, keyof typeof JOIN_ERROR>;
export type JoinValueError = JoinError[keyof JoinError];
export type JoinTryCatch<T, E extends JoinValueError> = ISuccessResponse<T> | E;
