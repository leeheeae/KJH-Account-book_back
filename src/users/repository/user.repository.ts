import { LOGIN_ERROR } from 'src/common/response/error/user-error.response';
import { ILoginInput } from '../dto/login.dto';
import { IJoinInput } from '../dto/join.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { IFindByEmailInput } from '../dto/find-by-email.dto';
import * as _ from 'lodash';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findByEmail({ email }: IFindByEmailInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async login(loginInput: ILoginInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginInput.email,
      },
    });

    if (!user) return LOGIN_ERROR.NOT_EXIST_USER;

    const isPasswordValid = await bcrypt.compare(loginInput.password, user.password);

    if (!isPasswordValid) return LOGIN_ERROR.IS_NOT_VALID_PASSWORD;

    return user;
  }

  async saveToken({ user, refreshToken: hashedToken }: { user: User; refreshToken: string }): Promise<void> {
    user.refreshToken = hashedToken;
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: hashedToken,
      },
    });
  }

  async register(registerInput: IJoinInput) {
    const { email, password, role, address, name, username, avatarUrl } = registerInput;
    const user = await this.prisma.user.create({
      data: {
        email,
        address,
        name,
        username,
        avatarUrl,
        password: await bcrypt.hash(password, 10),
        role: role === 'ADMIN' ? 'ADMIN' : 'USER',
        refreshToken: '',
      },
    });

    return user;
  }
}
