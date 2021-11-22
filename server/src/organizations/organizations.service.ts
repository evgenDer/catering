import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  getAll() {
    return this.organizationRepo.find();
  }

  create(organization: OrganizationDto) {
    return this.organizationRepo.save(organization);
  }

  update(organizationId: number, organization: OrganizationDto) {
    return this.organizationRepo.update(organizationId, organization);
  }
}
