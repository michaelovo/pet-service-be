import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {

    //create payload
    const { name, age, breed, isActive } = createCatDto;

    const existingCat = await this.catsRepository.findOne({
      where: [{ name }],
    });

    // Prevent duplicate
    if (existingCat) {
      throw new BadRequestException('Cat with these details already exists.');
    }

    // create new cat
    const newCat = this.catsRepository.create({
      name,
      age,
      breed,
      isActive,
    });
    return await this.catsRepository.save(newCat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat | null> {
    return this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {

    // Find record by ID
    const existingCat = await this.catsRepository.findOne({
      where: [{ id }],
    });

    // Check if record exist
    if (!existingCat) {
      throw new NotFoundException('Cat with these details does not exists.');
    }
    //Update record
    Object.assign(existingCat, updateCatDto);
    return await this.catsRepository.save(existingCat);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.catsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with ID ${id} not found.`);
    }
    return { message: `Cat with ID ${id} has been successfully deleted.` };
  }
}
