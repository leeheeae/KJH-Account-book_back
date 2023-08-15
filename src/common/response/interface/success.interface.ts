export interface ISuccessResponse<T> {
  success: boolean;
  requestToResponse?: `${number}ms`; // 요청부터 응답까지 걸린 시간
  message: {
    text: string;
    statusCode: number;
  };
  data: T;
}
