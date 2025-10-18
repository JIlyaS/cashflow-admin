import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { EstimateModule } from './estimate/estimate.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { PrismaClientModule } from './shared/models';

@Module({
  imports: [
    CategoryModule,
    UserModule,
    EstimateModule,
    AuthModule,
    ProjectModule,
    PrismaClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
