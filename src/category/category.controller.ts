import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRdo } from './rdo/category.rdo';
import { CategoryEntity } from './entities/category.entity';
import { fillDto } from 'src/shared/helpers/libs/common';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async index() {
    const categoryEntities = await this.categoryService.getAllCategories();
    const categories = categoryEntities
      .filter((item) => item)
      .map((category: CategoryEntity) => category.toPOJO());
    return fillDto(CategoryRdo, categories);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.categoryService.getCategory(id);
  }

  @Post()
  public async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);
    return fillDto(CategoryRdo, newCategory.toPOJO());
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, dto);
    return fillDto(CategoryRdo, updatedCategory.toPOJO());
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
  }
}
