import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationPayment } from './organizations-payment/organization-payment.entity';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsPaymentService } from './organizations-payment/organizations-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationPayment])],
  providers: [OrganizationsService, OrganizationsPaymentService],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}
