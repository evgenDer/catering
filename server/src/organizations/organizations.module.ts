import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './../users/profiles/profile.entity';
import { ProfilesService } from './../users/profiles/profiles.service';
import { OrganizationPayment } from './organizations-payment/organization-payment.entity';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsPaymentService } from './organizations-payment/organizations-payment.service';
import { Account } from '../users/accounts/account.entity';
import { AccountsService } from '../users/accounts/accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organization,
      OrganizationPayment,
      Account,
      Profile,
    ]),
  ],
  providers: [
    OrganizationsService,
    OrganizationsPaymentService,
    AccountsService,
    ProfilesService,
  ],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}
