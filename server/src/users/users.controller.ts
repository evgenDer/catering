import { ProfilesService } from './profiles/profiles.service';
import { Profile } from './profiles/profile.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto, GetUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get()
  async getAll(): Promise<User[]> {
    const users: User[] = await this.usersService.getAll();

    return users;
  }

  @Get('friend/:id')
  async getById(@Param('id') id): Promise<User> {
    return this.usersService.getById(id);
  }

  @Get('/current')
  async getMe(@Req() req): Promise<GetUserDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    return this.usersService.mapToSend(user);
  }

  @Get('/organization/:id')
  async getUsersFromOrganization(@Param('id') id) {
    const users: User[] = await this.usersService.getUsersFromOrganization(id);

    return users;
  }

  @Get('/organization/:id/sharing')
  async getAvailableSharingUsersFromOrganization(@Param('id') id) {
    const users: User[] =
      await this.usersService.getAvailableSharingUsersFromOrganization(id);

    return users;
  }

  @Put(':id')
  async updateUserProfile(@Param('id') id: string, @Body() profile: Profile) {
    const user = await this.usersService.getById(id);

    return this.profilesService.update(user.profile.id, profile);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.usersService.create(userDto);

    return this.usersService.mapToSend(user);
  }
}
