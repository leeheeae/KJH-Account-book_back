export interface IRegisterInput {
  /**
   * @format email
   */
  email: string;

  /**
   * @minLength 1
   */
  username: string;

  /**
   * @minLength 1
   */
  password: string;

  /**
   * @minLength 1
   */
  name: string;

  /**
   * @minLength 1
   */
  address: string;

  avatarUrl?: string;

  refreshToken?: string;

  role?: string;
}
