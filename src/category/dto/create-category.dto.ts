import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'marketplace',
  })
  public title: string;
}
