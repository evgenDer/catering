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

import { OrganizationDto } from './organization.dto';
import { CreateOrganizationsPaymentDto } from './organizations-payment/organizations-payment.dto';
import { HttpMessages } from '../app.dto';
import { OrganizationsService } from './organizations.service';
import { SkipAuth } from '../auth/skip-auth.decorator';
import { OrganizationsPaymentService } from './organizations-payment/organizations-payment.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly organizationService: OrganizationsService,
    private readonly organizationPaymentService: OrganizationsPaymentService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  async getAll() {
    const organizations = await this.organizationService.getAll();

    return organizations;
  }

  @Get('/:id/payments')
  @HttpCode(HttpStatus.OK)
  async getPaymentsByOrganizationId(@Param('id') id) {
    const organization = await this.organizationService.getById(id);

    return organization.payments;
  }

  @Get('/:id')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  async getInfoById(@Param('id') id) {
    // eslint-disable-next-line prettier/prettier
    const payment = await this.organizationPaymentService.getByOrganizationId(id);
    const organization = await this.organizationService.getById(id);

    return this.organizationService.mapToSendInfo(organization, payment);
  }

  @Post('/:id/payment')
  @HttpCode(HttpStatus.CREATED)
  async createPayment(
    @Param('id') id,
    @Body() payment: CreateOrganizationsPaymentDto,
  ) {
    const organization = await this.organizationService.getById(id);
    const createdPayment = await this.organizationPaymentService.create({
      ...payment,
      organization,
    });

    return {
      status: HttpStatus.CREATED,
      message: HttpMessages.CREATED,
      payment: createdPayment,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrganization(@Body() organization: OrganizationDto) {
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
