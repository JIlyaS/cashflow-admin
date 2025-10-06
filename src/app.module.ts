import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { EstimateModule } from './estimate/estimate.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CategoryModule, UserModule, EstimateModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
