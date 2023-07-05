import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsObject, IsOptional, IsString, Matches } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';

export class LoginInput {
  @ApiProperty({ example: 'animalBack@naver.com', description: '이메일' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @ApiProperty({ example: 'animalBack123!@', description: '비밀번호' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  password: string;
}

export class LoginOutput extends CoreOutput {
  @ApiProperty({
    example: {
      token: 'token',
      refreshToken: 'refreshToken',
    },
    description: '토큰과 리프레시 토큰',
  })
  @IsOptional()
  @IsObject({ message: '토큰과 리프레시 토큰은 객체여야 합니다.' })
  data?: {
    token?: string;
    refreshToken?: string;
  };
}
