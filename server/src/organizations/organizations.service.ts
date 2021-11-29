import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationDto, OrganizationInfoDto } from './organization.dto';
import { Organization } from './organization.entity';
import { OrganizationPayment } from './organizations-payment/organization-payment.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  private readonly relations = ['profiles', 'payments'];

  getById(organizationId: number) {
    return this.organizationRepo.findOne({
      relations: this.relations,
      where: { id: organizationId },
    });
  }

  getAll() {
    return this.organizationRepo.find();
  }

  create(organization: OrganizationDto) {
    return this.organizationRepo.save(organization);
  }

  update(organizationId: number, organization: OrganizationDto) {
    return this.organizationRepo.update(organizationId, organization);
  }

  mapToSendInfo(
    organization: Organization,
    payment: OrganizationPayment,
  ): OrganizationInfoDto {
    return {
      id: organization.id,
      name: organization.name,
      email: organization.email,
      phone: organization.phone,
      isActive: organization.isActive,
      countUsers: organization.profiles.length,
      currentPayment: payment
        ? {
            sum: payment.sum,
            startDate: payment.startDate,
            endDate: payment.endDate,
          }
        : null,
    };
  }
}
