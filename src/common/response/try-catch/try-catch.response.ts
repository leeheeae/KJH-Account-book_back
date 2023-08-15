import { FIND_BY_EMAIL_ERROR, FIND_BY_ID_ERROR, LOGIN_ERROR, REGISTER_ERROR } from '../error/user-error.response';
import { ISuccessResponse } from '../interface/success.interface';

export type Try<T> = ISuccessResponse<T>;

// * LOGIN_ERROR | 로그인 에러 상수
export type LoginError = Pick<typeof LOGIN_ERROR, keyof typeof LOGIN_ERROR>;
export type ValueOfLoginError = LoginError[keyof LoginError];
export type LoginTryCatch<T, E extends ValueOfLoginError> = ISuccessResponse<T> | E;

// * FIND_BY_ID_ERROR | 아이디 찾기 에러 상수
export type FindByIdError = Pick<typeof FIND_BY_ID_ERROR, keyof typeof FIND_BY_ID_ERROR>;
export type ValueOfFindByIdError = FindByIdError[keyof FindByIdError];
export type FindByIdTryCatch<T, E extends ValueOfFindByIdError> = ISuccessResponse<T> | E;

// * FIND_BY_EMAIL_ERROR | 이메일 찾기 에러 상수
export type KeyOfFindByEmailError = keyof typeof FIND_BY_EMAIL_ERROR;
export type ValueOfFindByEmailError = (typeof FIND_BY_EMAIL_ERROR)[KeyOfFindByEmailError];
export type FindByEmailTryCatch<T, E extends ValueOfFindByEmailError> = ISuccessResponse<T> | E;

// * REGISTER_ERROR | 회원가입 에러 상수
export type RegisterError = Pick<typeof REGISTER_ERROR, keyof typeof REGISTER_ERROR>;
export type ValueOfRegisterError = RegisterError[keyof RegisterError];
export type RegisterTryCatch<T, E extends ValueOfRegisterError> = ISuccessResponse<T> | E;
