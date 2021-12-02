import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from './account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async createEmptyAccount(balance?: number) {
    return this.accountRepo.save({ balance: balance || 0 });
  }

  async getById(id: number) {
    return this.accountRepo.findOne({
      where: { id },
    });
  }

  async increase(id: number, balance: number) {
    const { balance: outdatedBalance } = await this.getById(id);

    this.accountRepo.update(id, {
      balance: Number(outdatedBalance) + Number(balance),
    });
  }

  async decrease(id: number, balance: number) {
    const { balance: outdatedBalance } = await this.getById(id);

    return this.accountRepo.save({ id, balance: outdatedBalance - balance });
  }
}
