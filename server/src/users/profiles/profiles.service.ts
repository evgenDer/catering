import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { omit } from 'lodash';

import { Profile } from './profile.entity';
import { CreateProfileDto, GetProfileDto } from './profiles.dto';
import { AccountsService } from './../accounts/accounts.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private readonly accountService: AccountsService,
  ) {}

  private relations = ['organization', 'account'];

  getById(id: number) {
    return this.profileRepo.findOne({
      relations: this.relations,
      where: { id },
    });
  }

  async create(profileDto: CreateProfileDto): Promise<Profile> {
    const account = await this.accountService.createEmptyAccount();

    return this.profileRepo.save({ ...profileDto, account });
  }

  async update(id: number, profileDto: CreateProfileDto) {
    return this.profileRepo.update(id, omit(profileDto, 'organizationName'));
  }

  mapToSend({
    id,
    name,
    surname,
    birthday,
    phone,
    goalCalories,
    organization,
    account,
  }: Profile): GetProfileDto {
    return {
      id,
      name,
      surname,
      birthday,
      phone,
      goalCalories,
      organizationId: organization.id,
      organizationName: organization.name,
      account,
    };
  }
}
