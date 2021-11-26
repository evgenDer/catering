import { organizationId } from 'aws-sdk/clients/auditmanager';
import { Organization } from './../../organizations/organization.entity';

export interface CreateProfileDto {
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  goalCalories: number;
  organization: Organization;
  organizationId?: number;
}

export interface GetProfileDto {
  id: number;
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  goalCalories: number;
  organizationId: number;
}
