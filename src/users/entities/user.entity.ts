import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsJWT, IsOptional, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

@Entity()
export class User extends CoreEntity {
  @Column('varchar', { length: 255, nullable: false, unique: true, comment: '유저 이메일' })
  @ApiProperty({ example: 'animalBack@naver.com', description: '이메일' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @Index()
  email: string;

  @Column('varchar', { length: 255, nullable: false, comment: '유저 이름' })
  @IsString({ message: '이름을 잘못 입력 하셨습니다.' })
  @ApiProperty({ example: '정빈', description: '이름' })
  name: string;

  @Column('varchar', { length: 255, nullable: false, comment: '유저 비밀번호' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  @ApiProperty({ example: 'animalBack123!@', description: '비밀번호' })
  password: string;

  @Column('varchar', { default: 'avatar', nullable: true, comment: '유저 아바타' })
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'avatar', description: '유저 아바타' })
  avatar?: string;

  @Column('boolean', { default: false, nullable: true, comment: '소셜 로그인 여부' })
  @IsBoolean({ message: '소셜 로그인만 사용할 수 있습니다.' })
  @IsOptional()
  @ApiProperty({ example: false, description: '소셜 로그인 여부' })
  socialOnly?: boolean;

  @Column('varchar', { default: '', nullable: false, comment: '휴대폰 번호', unique: true })
  @Index()
  @IsPhoneNumber('KR', { message: '전화번호가 정확하지 않습니다.' })
  @ApiProperty({ example: '010-1234-5678', description: '휴대폰 번호' })
  phoneNum: string;

  @Column('varchar', { default: '한국', nullable: true, comment: '주소' })
  @IsString({ message: '주소가 정확하지 않습니다.' })
  @IsOptional()
  @ApiProperty({ example: '한국', description: '주소' })
  address?: string;

  @Column('enum', { enum: UserRole, default: UserRole.User, nullable: false, comment: '유저 권한' })
  @IsEnum(UserRole, { message: '유저 권한이 정확하지 않습니다.' })
  @ApiProperty({ example: 'User', enum: UserRole, description: '유저 권한' })
  role: UserRole;

  @Column('varchar', { default: '', nullable: true, comment: '유저 토큰' })
  @IsOptional()
  @IsJWT({ message: '토큰이 정확하지 않습니다.' })
  @ApiProperty({ example: 'token', description: '유저 토큰' })
  refreshToken?: string;

  @Column('boolean', { default: false, nullable: true, comment: '이메일 인증 여부' })
  @ApiProperty({ example: false, description: '이메일 인증 여부' })
  @IsOptional()
  @IsBoolean({ message: '이메일 인증 여부는 불리언 타입이어야 합니다.' })
  verified?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<boolean> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
        return true;
      } catch (error) {
        new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
