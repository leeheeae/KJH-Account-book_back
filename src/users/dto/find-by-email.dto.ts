import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional } from 'class-validator';
import { USER_SUCCESS_RESPONSE } from 'src/common/constants/swagger/user/user-success-response.constant';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

export class FindByEmailInput {
  @ApiProperty({ example: 'animalBack@naver.com' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;
}

export class FindByEmailOutput extends CoreOutput {
  @ApiProperty({ example: USER_SUCCESS_RESPONSE.getFindByEmail.example.user })
  @IsObject({ message: '유저는 객체이어야 합니다.' })
  @IsOptional()
  user?: User;
}
