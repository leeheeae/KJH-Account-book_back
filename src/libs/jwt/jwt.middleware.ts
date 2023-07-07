import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { IJwtService } from './interface/jwt-service.interface';
import { ILoggerService } from '../logger/interface/logger-service.interface';
import { IUsersService } from 'src/users/interface/user-service.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject('IJwtService') private readonly jwtService: IJwtService,
    @Inject('IUsersService') private readonly userService: IUsersService,
    @Inject('ILoggerService') private readonly log: ILoggerService,
  ) {}

  /**
   *  * jwt middleware 미들웨어
   *  * 목표 access_token 과 refresh_token 구현하기
   *
   *  1.  header로 날아온 authorization(access_token), refresh_token 그리고 email 받습니다
   *  2.  authorization(access_token) decoded를 해줍니다 문제가 없다면 if문으로 내려가 검증을 하고 있다면 catch문으로 받습니다
   *  3.  데이터 베이스에 있는 refresh_token이 만료가 되었는지 검증합니다 만료되지 않았다면 decoded 하고
   *      만약에 만료되었다면 error를 return 합니다
   *  4.  decoded 된 코튼을 해제하여 user의 정보를 찾습니다 authUser에 전달합니다
   */
  async use(req: Request, res: Response, next: NextFunction) {
    //* task_1: token, refreshToken,email 을 header로 받기
    if ('authorization' in req.headers && 'refresh_token' in req.headers && 'email' in req.headers) {
      const { authorization, refresh_token, email } = req.headers;

      let decoded = {};
      let refreshTokenDecoded = {};
      const token: string = (authorization as string).split('Bearer')[1].trim();
      const refreshToken: string = (refresh_token as string).split('Bearer')[1].trim();

      try {
        //* task_2: access_token decoded 해주기
        // 1. 문제가 없다면 바로 아래 if 문에서 검증 시작
        // 2. 문제가 있다면 catch 문으로 진행

        // decoded = this.jwtService.verify(token.split(' ').slice(-1)[0]);
        decoded = this.jwtService.verify(token.toString());
      } catch {
        //* task_3 access_token이 만료됐을 경우 refreshToken 찾기
        // 1. access_token이 만료가 됐을시 저장 되어 있는 refreshToken을 찾습니다
        // 2. 데이터베이스에 해시화 되어 있는것을 전달된 refreshToken과 서로 같은지 비교합니다
        // 3. 데이터베이스에 있는 refreshToken이 만료가 되어 있지 않았을때는 decoded 하여 보내줍니다
        // 4. 만약에 데이터베이스에 있는 refreshToken 까지 만료되었다면 error 를 return 합니다

        const {
          data: { user },
        } = await this.userService.findByEmail(email as string);
        try {
          const isCheckedEmailToken = await bcrypt.compare(user.refreshToken, refreshToken as string);

          if (isCheckedEmailToken) {
            refreshTokenDecoded = this.jwtService.verify(user.refreshToken.toString());
          }
        } catch {
          // ! [ERROR] refreshToken 만료
          this.log.logger().error(this.log.loggerInfo(`ForbiddenException | 권한이 없습니다.`));
          return res.json({ error: 'allTokenExpired' });
        }

        if (typeof refreshTokenDecoded === 'object' && refreshTokenDecoded.hasOwnProperty('exp')) {
          const newToken = this.jwtService.sign({ id: user.id });
          decoded = this.jwtService.verify(newToken.toString());
        }
      }

      //* task_4: decoded 된 코튼을 해제하여 user의 정보를 찾습니다
      // 1. token이 object인지 그리고 그 object에서 id를 가지고 있는지 검증합니다
      // 2. 유저의 정보를 찾아서 user 변수에 담아줍니다
      // 3. ok 와 refreshToken이 true 이면서 그리고 데이터 베이스와도 일치하는지 확인합니다
      // 4. 모두 검증을 통과했다면 req에 user를 담아서 authUser에 정보를 포함해서 넘겨줍니다

      if (typeof decoded !== 'object' || !decoded.hasOwnProperty('id')) {
        // ! [ERROR] token 만료
        this.log.logger().error(this.log.loggerInfo(`ForbiddenException | 권한이 없습니다.`));
        throw new ForbiddenException();
      }

      try {
        const {
          data: { user },
          ok,
        } = await this.userService.findById(decoded['id']);
        // 만약에 이미 refreshToken 이 있는것을 social 로그인 할때 저장을 안해주면 여기서 에러 발생
        const isCheckedIdToken = await bcrypt.compare(user.refreshToken, refreshToken as string);
        if (!ok || !isCheckedIdToken) {
          // ! [ERROR] token 만료
          this.log.logger().error(this.log.loggerInfo(`ForbiddenException | 권한이 없습니다.`));
          throw new ForbiddenException();
        }

        // * JWT MIDDLEWARE | 호출 성공
        this.log.logger().info(this.log.loggerInfo(`JWT MIDDLEWARE | 호출 성공`));
        req['user'] = user;
      } catch (error) {
        // ! [ERROR] token 만료
        this.log.logger().error(this.log.loggerInfo(`ForbiddenException | 권한이 없습니다.`));
        throw new ForbiddenException();
      }
    }
    next();
  }
}
