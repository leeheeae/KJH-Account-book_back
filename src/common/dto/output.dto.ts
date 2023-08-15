import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmptyObject, IsObject, IsOptional, IsString } from 'class-validator';

export class CoreOutput {
  @ApiProperty({
    example: 'Error',
    description: '에러를 반환합니다.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: '에러는 문자열이어야 합니다.' })
  @IsObject({ message: '에러는 객체이어야 합니다.' })
  @IsNotEmptyObject({}, { message: '에러는 비어있으면 안됩니다.' })
  error?: string | Error;

  @ApiProperty({
    example: {
      text: '게시물 전체 조회 성공',
      statusCode: 200,
    },
    description: '메시지를 반환합니다.',
    required: false,
  })
  @IsOptional()
  @IsObject({ message: '메시지는 객체이어야 합니다.' })
  @IsNotEmptyObject({}, { message: '메시지는 비어있으면 안됩니다.' })
  message?: {
    text: string;
    statusCode?: number;
  };

  @ApiProperty({
    example: true,
    description: '성공 여부를 반환합니다.',
    required: true,
  })
  @IsBoolean({ message: '성공 여부는 불리언이어야 합니다.' })
  ok: boolean;
}
