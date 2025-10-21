import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaClientModule } from 'src/shared/models';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
