import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { I_USERS_SERVICE } from 'src/common/constants/service/service-interface.constant';
import { UserRepository } from './repository/user.repository';

@Module({
  providers: [
    {
      provide: I_USERS_SERVICE,
      useClass: UsersService,
    },
    UserRepository,
  ],
  controllers: [UsersController],
  exports: [I_USERS_SERVICE],
})
export class UsersModule {}
