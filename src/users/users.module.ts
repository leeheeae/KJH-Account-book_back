import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repository/users.repository';
import { provideCustomRepository } from 'src/common/repository/custom-repository';
import { I_USERS_SERVICE } from 'src/common/constants/service/service.constant';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: I_USERS_SERVICE,
      useClass: UsersService,
    },
    provideCustomRepository(User, UsersRepository),
  ],
  controllers: [UsersController],
  exports: [I_USERS_SERVICE],
})
export class UsersModule {}
