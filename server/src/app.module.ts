import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DishesModule } from './dishes/dishes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
