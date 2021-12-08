import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { DishesModule } from './dishes/dishes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { EmailModule } from './email/email.module';
import { ConsumptionModule } from './consumption/consumption.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.DOMAIN_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        tls: { rejectUnauthorized: false },
      },
      defaults: {
        from: `Система корпоротивного питания Vood ${process.env.DOMAIN_EMAIL}`,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        port: parseInt(process.env.DB_PORT) || 5432,
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        schema: 'public',
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
        synchronize: true,
      }),
    }),
    DishesModule,
    OrganizationsModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    EmailModule,
    ConsumptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
