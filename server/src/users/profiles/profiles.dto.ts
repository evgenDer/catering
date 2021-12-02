import { Account } from '../accounts/account.entity';
import { Organization } from './../../organizations/organization.entity';

export interface CreateProfileDto {
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  goalCalories?: number;
  organization: Organization;
  organizationId?: number;
  account: Account;
}

export interface GetProfileDto {
  id: number;
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  goalCalories?: number;
  organizationId: number;
  organizationName: string;
  account?: Account;
}
