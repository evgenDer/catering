import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto, GetProfileDto } from './profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  private relations = ['organization'];

  getById(id: number) {
    return this.profileRepo.findOne({
      relations: this.relations,
      where: { id },
    });
  }

  async create(profileDto: CreateProfileDto): Promise<Profile> {
    return this.profileRepo.save(profileDto);
  }

  mapToSend({
    id,
    name,
    surname,
    birthday,
    phone,
    goalCalories,
    organization,
  }: Profile): GetProfileDto {
    return {
      id,
      name,
      surname,
      birthday,
      phone,
      goalCalories,
      organizationId: organization.id,
    };
  }
}
