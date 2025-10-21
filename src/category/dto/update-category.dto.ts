import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'marketplace',
  })
  public title: string;
}
