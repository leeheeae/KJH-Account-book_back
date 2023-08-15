export interface ILoginInput {
  /**
   * @format email
   */
  email: string;
  /**
   * @pattern ^(?=.*[a-zA-Z])(?=.*[0-9]).{3,16}$
   */
  password: string;
}

export interface ILoginOutputData {
  /**
   * @minLength 1
   * @pattern ^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$
   */
  token: string;

  /**
   * @minLength 1
   */
  refreshToken: string;
}
