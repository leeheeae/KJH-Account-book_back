import { JwtModuleOption } from './interface/jwt.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constant';
import * as jwt from 'jsonwebtoken';
import { IJwtService } from './interface/jwt-service.interface';
@Injectable()
export class JwtService implements IJwtService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOption) {}

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

  verify(token: string) {
    return jwt.verify(token, this.options.jwtPrivateKey);
  }
}
