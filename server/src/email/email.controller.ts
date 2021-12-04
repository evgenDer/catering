import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { UsersService } from './../users/users.service';
import { EmailService } from './email.service';
import { EmailMessage } from './email.dto';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req, @Body() content: EmailMessage): Promise<void> {
    const user = await this.usersService.getById(req.user?.id || '');

    this.emailService.sendQuestionEmail(user, content.message);
  }
}
