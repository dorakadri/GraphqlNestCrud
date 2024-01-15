import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './Dto/create-pet.input';
import { Owner } from '../owners/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }
  @Query((returns) => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petService.findOnebyid(id);
  }
  
  //lezemha lism kima declarer fil entity so onwer not getowner or wtv it resolvve a specific field
  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    console.log(pet.ownerId)
    return this.petService.findOwner(pet.ownerId);
  }
  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petService.createPet(createPetInput);
  }



}
