import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constant';
import * as jwt from 'jsonwebtoken';
import { IJwtService } from './interface/jwt-service.interface';
import { IJwtModuleOption } from './interface/jwt.interface';
@Injectable()
export class JwtService implements IJwtService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: IJwtModuleOption) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.jwtPrivateKey, {
      expiresIn: this.options.jwtExpiresSec,
    });
  }

  refreshSign(payload: object): string {
    return jwt.sign(payload, this.options.jwtPrivateKey, {
      expiresIn: this.options.refreshExpiresSec,
    });
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.options.jwtPrivateKey);
  }
}
