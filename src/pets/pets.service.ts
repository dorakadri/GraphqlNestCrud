import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './Dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';
@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>,private ownerService:OwnersService) {}
  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(createPetInput);
    return this.petRepository.save(newPet);
  }

  async findOnebyid(id: number): Promise<Pet> {
    return this.petRepository.findOneOrFail({ where: { id: id } });
  }

  findOwner(ownerId: number):Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }

}
