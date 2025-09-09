import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'bb6a7e881e32bf4d9567c8d95290c12535a26ccacaf3b1e8752885e3eed2fcd713f694b786dd6974c0e0a0f76e38ce006b787471591f3f018394dfe280fb257b',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule], // export so AdminsService can inject JwtService
})
export class AuthModule {}
