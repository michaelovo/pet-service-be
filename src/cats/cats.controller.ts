import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('api/v1/cats/')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get('all')
  findAll() {
    return this.catsService.findAll();
  }

  @Get('fetch/:id')
  async findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
