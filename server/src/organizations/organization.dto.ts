import { GetProfileDto } from './../users/profiles/profiles.dto';
import {
  GetOrganizationsPaymentDto,
  PaymentDto,
} from './organizations-payment/organizations-payment.dto';
export interface OrganizationDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  profiles: GetProfileDto[];
  payments?: GetOrganizationsPaymentDto[];
}

export interface OrganizationInfoDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  countUsers: number;
  currentPayment: PaymentDto;
}
