import { Organization } from './../organizations/organization.entity';
import { OrganizationsService } from './../organizations/organizations.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesService } from './roles/roles.service';
import { ProfilesService } from './profiles/profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles/profile.entity';
import { Role } from './roles/role.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './user.entity';
import { RolesController } from './roles/roles.controller';
import { HashService } from './hash/hash.service';

@Module({
  providers: [
    UsersService,
    RolesService,
    ProfilesService,
    HashService,
    OrganizationsService,
  ],
  controllers: [UsersController, RolesController],
  imports: [
    TypeOrmModule.forFeature([User, Role, Profile, Organization]),
    ConfigModule.forRoot(),
  ],
  exports: [
    UsersService,
    RolesService,
    ProfilesService,
    HashService,
    OrganizationsService,
  ],
})
export class UsersModule {}
