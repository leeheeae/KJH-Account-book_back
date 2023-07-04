import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsJWT, IsOptional, IsString, Matches } from 'class-validator';
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
  @ApiProperty({ example: 'token', description: '토큰' })
  @IsOptional()
  @IsString({ message: '토큰은 문자열이어야 합니다.' })
  @IsJWT({ message: '토큰이 유효하지 않습니다.' })
  token?: string;

  @ApiProperty({ example: 'refreshToken', description: '리프레시 토큰' })
  @IsOptional()
  @IsString({ message: '리프레시 토큰은 문자열이어야 합니다.' })
  @IsJWT({ message: '리프레시 토큰이 유효하지 않습니다.' })
  refreshToken?: string;
}
