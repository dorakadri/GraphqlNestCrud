import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from '../owners/entities/owner.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() //typeorm
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn() //Typeorm
  @Field((type) => Int)
  id: number;

  @Column() //Typeorm
  @Field()
  name: string;

  @Column({ nullable: true }) //Typeorm
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field((type) => Int)
  ownerId: number;

  @ManyToOne(() => Owner, owner => owner.pets)
  @Field((type) => Owner)
  owner: Owner;
}
