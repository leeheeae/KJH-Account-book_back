import { ISuccessResponse } from '../interface/success.interface';

export function ResultResponse<T>(response: ISuccessResponse<T>): ISuccessResponse<T> {
  return response;
}
