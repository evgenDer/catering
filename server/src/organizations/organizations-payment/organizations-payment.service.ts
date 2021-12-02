import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationPayment } from './organization-payment.entity';
import { CreateOrganizationsPaymentDto } from './organizations-payment.dto';
import { AccountsService } from '../../users/accounts/accounts.service';
import { OrganizationsService } from '../organizations.service';
import { ProfilesService } from '../../users/profiles/profiles.service';

@Injectable()
export class OrganizationsPaymentService {
  constructor(
    @InjectRepository(OrganizationPayment)
    private readonly organizationPaymentRepo: Repository<OrganizationPayment>,
    private readonly accountService: AccountsService,
    private readonly organizationService: OrganizationsService,
    private readonly profileService: ProfilesService,
  ) {}

  private readonly relations = ['organization'];

  async create(createOrganizationPayment: CreateOrganizationsPaymentDto) {
    const payment = await this.organizationPaymentRepo.save(
      createOrganizationPayment,
    );

    const organization = await this.organizationService.getById(
      payment.organization.id,
    );

    organization.profiles.forEach(async (profile) => {
      const fullProfile = await this.profileService.getById(profile.id);
      const balance = payment.sum / organization.profiles.length;

      if (!fullProfile?.account) {
        const account = await this.accountService.createEmptyAccount(balance);
        this.profileService.update(profile.id, {
          ...fullProfile,
          account,
        });
      } else {
        await this.accountService.increase(fullProfile.account.id, balance);
      }
    });

    return payment;
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
