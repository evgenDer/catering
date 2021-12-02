import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';

import { GetStatusesConfigDto, Statuses } from './statuses.dto';
import { Status } from './status.entity';

@Injectable()
export class StatusesService {
  private statuses: Status[] = [];

  constructor(
    @InjectRepository(Status) private readonly statusRepo: Repository<Status>,
  ) {}

  public async getConfig(): Promise<GetStatusesConfigDto> {
    await this.syncStatuses();

    return {
      statuses: this.statuses,
    };
  }

  public async getByStatusName(statusName: string = Statuses.REVIEW) {
    await this.syncStatuses();

    return this.statuses.find(({ name }: Status) => name === statusName);
  }

  public async getById(statusId: number): Promise<Status> {
    await this.syncStatuses();

    return this.statuses.find(({ id }: Status) => id === statusId);
  }

  private async syncStatuses(): Promise<void> {
    if (isEmpty(this.statuses)) {
      this.statuses = await this.statusRepo.find();
    }
  }
}
