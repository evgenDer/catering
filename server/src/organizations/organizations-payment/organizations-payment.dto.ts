import { Organization } from '../organization.entity';

export interface PaymentDto {
  startDate: Date;
  endDate: Date;
  sum: number;
}

export interface CreateOrganizationsPaymentDto extends PaymentDto {
  organization: Organization;
}

export interface GetOrganizationsPaymentDto extends PaymentDto {
  id: number;
  organizationId: number;
}
