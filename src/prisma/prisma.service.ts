import { BEFORE_EXIT } from './../common/constants/common.constant';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on(BEFORE_EXIT as never, async () => {
      await app.close();
    });
  }
}
