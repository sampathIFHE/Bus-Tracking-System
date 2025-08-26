import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusesModule } from './buses/buses.module';
import { DriverModule } from './driver/driver.module';
import { BranchesModule } from './branches/branches.module';
import { AdminsModule } from './admins/admins.module';

// import your entities here, e.g.:

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     
    // ✅ TypeORM + PostgreSQL Connection
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false, // required by Neon
        },
        autoLoadEntities: true,
        synchronize: true, // set to false in production
      }),
    }),
     
    BusesModule,
    DriverModule,
    BranchesModule,
    AdminsModule,
    // Add your feature modules here


    
  ],
  controllers: [AppController],
  providers: [AppService,  ],
})
export class AppModule {}
