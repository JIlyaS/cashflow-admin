import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly сategoryRepository: CategoryRepository) {}

  public async getCategory(id: string): Promise<CategoryEntity | null> {
    return this.сategoryRepository.findById(id);
  }

  public async getAllCategories(): Promise<(CategoryEntity | null)[]> {
    return await this.сategoryRepository.find();
  }

  public async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existsCategory = (
      await this.сategoryRepository.find({ title: dto.title })
    ).at(0);

    if (existsCategory) {
      throw new ConflictException('A category with the title already exists');
    }

    const newCategory = new CategoryEntity(dto);
    await this.сategoryRepository.save(newCategory);

    return newCategory;
  }

  public async deleteCategory(id: string): Promise<void> {
    try {
      await this.сategoryRepository.deleteById(id);
    } catch {
      // TODO. Обратите внимание. Ошибки могут быть разными
      // Вы должны реагировать на них по-разному.
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async updateCategory(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const categoryEntity = new CategoryEntity(dto);

    try {
      const updatedCategory = await this.сategoryRepository.update(
        id,
        categoryEntity,
      );

      if (!updatedCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return updatedCategory;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
