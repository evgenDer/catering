import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Account } from 'src/users/accounts/account.entity';
import { HashService } from './../users/hash/hash.service';
import { Organization } from './../organizations/organization.entity';
import { Profile } from './../users/profiles/profile.entity';
import { ProfilesService } from './../users/profiles/profiles.service';
import { Role } from './../users/roles/role.entity';
import { UsersService } from './../users/users.service';
import { User } from '../users/user.entity';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { RolesService } from '../users/roles/roles.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { AccountsService } from '../users/accounts/accounts.service';

// TODO: remove unused services
@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    UsersService,
    RolesService,
    ProfilesService,
    OrganizationsService,
    HashService,
    ConfigService,
    AccountsService,
  ],
  imports: [
    TypeOrmModule.forFeature([Account, User, Role, Profile, Organization]),
  ],
})
export class EmailModule {}
