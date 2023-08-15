export interface IErrorResponse<T> {
  success: false;
  message: {
    text: string;
    statusCode: number;
  };
  data: T;
}
