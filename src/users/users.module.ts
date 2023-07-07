import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repository/users.repository';
import { provideCustomRepository } from 'src/common/repository/custom-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'IUsersService',
      useClass: UsersService,
    },
    provideCustomRepository(User, UsersRepository),
  ],
  controllers: [UsersController],
  exports: ['IUsersService'],
})
export class UsersModule {}
