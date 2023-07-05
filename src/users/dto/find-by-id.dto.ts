import { CoreOutput } from '../../common/dto/output.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
import { USER_SUCCESS_RESPONSE } from '../../common/constants/swagger/user/user-success-response.constant';

export class FindByIdInput {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '유저 아이디는 숫자이어야 합니다.' })
  userId: number;
}

export class FindByIdOutput extends CoreOutput {
  @ApiProperty({ example: USER_SUCCESS_RESPONSE.getFindById.example.user })
  @IsObject({ message: '유저는 객체이어야 합니다.' })
  @IsOptional()
  user?: User;
}
