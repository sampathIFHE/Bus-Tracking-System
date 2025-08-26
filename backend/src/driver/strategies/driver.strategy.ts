// strategies/driver.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriverStrategy extends PassportStrategy(Strategy, 'driver') {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: any) {
    const driver = await this.driversRepository.findOne({ 
      where: { id: payload.sub } 
    });
    
    if (!driver) {
      throw new UnauthorizedException('Invalid token');
    }
    
    return driver;
  }
}