import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HttpException } from '@nestjs/common';
import { JoinInput } from '../dto/join.dto';
import { LoginInput } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { USER_ERROR } from 'src/common/constants/error.constant';

export class UsersRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    try {
      const user = await this.findOneBy({ id }).then(result => {
        delete result.password;
        return result;
      });
      return user;
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.findOne({ where: { email } }).then(result => {
        delete result.password;
        return result;
      });
      return user;
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }

  async join({
    email,
    password,
    confirmationPassword,
    name,
    address,
  }: JoinInput): Promise<User | typeof USER_ERROR.notMatchedPasswords | typeof USER_ERROR.existUser> {
    try {
      if (password !== confirmationPassword) return USER_ERROR.notMatchedPasswords;

      const exists = await this.findOne({ where: { email } });

      if (exists) return USER_ERROR.existUser;

      const user = this.create({
        email,
        password,
        name,
        address,
      });

      return user;
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }

  async verifiedUserData({
    email,
    password,
  }: LoginInput): Promise<User | typeof USER_ERROR.notExistUser | typeof USER_ERROR.wrongPassword> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user) return USER_ERROR.notExistUser;

      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) return USER_ERROR.wrongPassword;

      return user;
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }

  async saveToken({ user, refreshToken: hashedToken }: { user: User; refreshToken: string }): Promise<void> {
    try {
      user.refreshToken = hashedToken;
      await this.save(user);
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }
}
