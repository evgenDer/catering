import { OrganizationDto } from './organization.dto';
import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';

import { HttpMessages } from '../app.dto';
import { OrganizationsService } from './organizations.service';
import { SkipAuth } from '../auth/skip-auth.decorator';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  async getAll() {
    const organizations = await this.organizationService.getAll();

    return organizations;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPurchaseDish(@Body() organization: OrganizationDto) {
    const createdOrganization = await this.organizationService.create(
      organization,
    );

    return {
      status: HttpStatus.CREATED,
      message: HttpMessages.CREATED,
      organization: createdOrganization,
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updatePurchaseDish(
    @Param('id') id,
    @Body() organization: OrganizationDto,
  ): Promise<void> {
    await this.organizationService.update(id, organization);
  }
}
