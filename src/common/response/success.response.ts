export interface IResultSuccess<T> {
  ok: boolean;
  message: {
    text: string;
    statusCode: number;
  };
  data: T;
}

interface IResultSuccessInput {
  data: unknown;
  text: string;
  statusCode: number;
}

export const resultSuccess = ({ data, text, statusCode }: IResultSuccessInput): IResultSuccess<typeof data> => {
  return {
    ok: true,
    message: {
      text,
      statusCode,
    },
    data,
  };
};
