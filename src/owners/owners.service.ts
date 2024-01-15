import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const newowner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newowner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOneOrFail({ where: { id: id } });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownerRepository.update({ id }, { ...updateOwnerInput });
  }

  remove(id: number) {
    return this.ownerRepository.delete({ id });
  }
}
