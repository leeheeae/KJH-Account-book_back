import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BadRequestException, HttpException } from '@nestjs/common';
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
      throw new HttpException(error.message, error.status);
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
      throw new HttpException(error.message, error.status);
    }
  }

  async join({ email, password, confirmationPassword, name, address }: JoinInput): Promise<User> {
    try {
      if (password !== confirmationPassword) {
        throw new BadRequestException({
          message: USER_ERROR.notMatchedPasswords,
        });
      }

      const exists = await this.findOne({ where: { email } });

      if (exists) {
        throw new BadRequestException({
          message: USER_ERROR.existUser,
        });
      }

      const user = this.create({
        email,
        password,
        name,
        address,
      });
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async verifiedUserData({ email, password }: LoginInput): Promise<User> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user) {
        throw new BadRequestException({
          message: USER_ERROR.notExistUser,
        });
      }

      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) {
        throw new BadRequestException({
          message: USER_ERROR.wrongPassword,
        });
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async saveToken({ user, refreshToken: hashedToken }: { user: User; refreshToken: string }): Promise<void> {
    try {
      user.refreshToken = hashedToken;
      await this.save(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
