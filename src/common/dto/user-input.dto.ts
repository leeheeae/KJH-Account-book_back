import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, Matches, IsPhoneNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserInputDto {
  @ApiProperty({ example: '정빈' })
  @IsString({ message: '이름이 정확하지 않습니다.' })
  name: string;

  @ApiProperty({ example: 'jeongbin@naver.com' })
  @IsEmail({}, { message: '이메일이 정확하지 않습니다.' })
  email: string;

  @ApiProperty({ example: 'animalBack123!@' })
  @IsString({ message: '비밀번호가 정확하지 않습니다.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  password: string;

  @ApiProperty({ example: 'animalBack123!@' })
  @IsString({ message: '확인 비밀번호가 정확하지 않습니다.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  confirmationPassword: string;

  @ApiProperty({ example: '서울' })
  @IsString({ message: '주소가 정확하지 않습니다.' })
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '010-1234-5678' })
  @IsPhoneNumber('KR', { message: '전화번호가 정확하지 않습니다.' })
  phoneNum: string;
}
