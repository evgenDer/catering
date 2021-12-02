import { Controller, Get } from '@nestjs/common';

import { GetStatusesConfigDto } from './statuses.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  async getConfig(): Promise<GetStatusesConfigDto> {
    return this.statusesService.getConfig();
  }
}
