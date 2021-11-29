import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationPayment } from './organization-payment.entity';
import { CreateOrganizationsPaymentDto } from './organizations-payment.dto';

@Injectable()
export class OrganizationsPaymentService {
  constructor(
    @InjectRepository(OrganizationPayment)
    private readonly organizationPaymentRepo: Repository<OrganizationPayment>,
  ) {}

  private readonly relations = ['organization'];

  create(createOrganizationPayment: CreateOrganizationsPaymentDto) {
    return this.organizationPaymentRepo.save(createOrganizationPayment);
  }

  getByOrganizationId(organizationId: number) {
    return this.organizationPaymentRepo.findOne({
      relations: this.relations,
      where: {
        organization: { id: organizationId },
        endDate: Raw((alias) => `${alias} >= NOW()`),
      },
    });
  }
}
