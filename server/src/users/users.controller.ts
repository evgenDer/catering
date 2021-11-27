import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, GetUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    const users: User[] = await this.usersService.getAll();

    return users;
  }

  @Get('/current')
  async getMe(@Req() req): Promise<GetUserDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    return this.usersService.mapToSend(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.usersService.create(userDto);

    return this.usersService.mapToSend(user);
  }
}
