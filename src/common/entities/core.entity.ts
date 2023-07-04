import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 0, description: '아이디' })
  @IsNumber({}, { message: '아이디는 숫자이어야 합니다.' })
  id: number;

  @CreateDateColumn()
  @ApiProperty({ example: new Date(), description: '생성일' })
  @IsDate({ message: '생성일은 날짜이어야 합니다.' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: new Date(), description: '수정일' })
  @IsDate({ message: '수정일은 날짜이어야 합니다.' })
  updatedAt: Date;
}
