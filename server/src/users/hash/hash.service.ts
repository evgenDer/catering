import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}
  async hash(data: string): Promise<string> {
    const saltRounds = await this.configService.get('SALT_ROUNDS');
    return hash(data, Number(saltRounds));
  }

  async compare(toCheck: string, encrypted: string): Promise<boolean> {
    return compare(toCheck, encrypted);
  }
}
