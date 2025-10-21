/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { PrismaClientService } from 'src/shared/models';

@Injectable()
export class EstimateService {
  constructor(private readonly prisma: PrismaClientService) {}

  create(createEstimateDto: CreateEstimateDto) {
    return 'This action adds a new estimate';
  }

  findAll() {
    return this.prisma.estimate.findMany();
    // return `This action returns all estimate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estimate`;
  }

  update(id: number, updateEstimateDto: UpdateEstimateDto) {
    return `This action updates a #${id} estimate`;
  }

  remove(id: number) {
    return `This action removes a #${id} estimate`;
  }
}
