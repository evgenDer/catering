import { CreateProfileDto, GetProfileDto } from './profiles/profiles.dto';

export interface CreateUserDto {
  email: string;
  password: string;
  roleId: number;
  profile?: CreateProfileDto;
}

export interface GetUserDto {
  id: number;
  email: string;
  roleId: number;
  profile?: GetProfileDto;
}
