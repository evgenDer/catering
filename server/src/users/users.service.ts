import { OrganizationsService } from './../organizations/organizations.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto, GetUserDto } from './users.dto';
import { RolesService } from './roles/roles.service';
import { Role } from './roles/role.entity';
import { ProfilesService } from './profiles/profiles.service';
import { Profile } from './profiles/profile.entity';
import { HashService } from './hash/hash.service';

@Injectable()
export class UsersService {
  private readonly relations = ['profile', 'role'];

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly profilesService: ProfilesService,
    private readonly organizationsService: OrganizationsService,
    private readonly hashService: HashService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepo.find({ relations: this.relations });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      relations: this.relations,
      where: { email },
    });
  }

  async getById(id: string): Promise<User> {
    return this.userRepo.findOne({
      relations: this.relations,
      where: { id },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const organization = await this.organizationsService.getById(
        user.profile.organizationId,
      );
      const role: Role = await this.rolesService.getById(user.roleId);
      const profile: Profile =
        user.profile &&
        (await this.profilesService.create({
          ...user.profile,
          organizationId: organization.id,
        }));

      const hashedPassword = await this.hashService.hash(user.password);

      return await this.userRepo.save({
        ...user,
        role,
        profile,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('email already exists');
    }
  }

  public mapToSend({ id, email, role, profile }: User): GetUserDto {
    return {
      id,
      email,
      roleId: role.id,
      ...(profile && {
        profile: this.profilesService.mapToSend(profile),
      }),
    };
  }
}
