export interface IJwtService {
  sign: (payload: object) => string;
  refreshSign: (payload: object) => string;
  verify: (token: string) => object;
}
