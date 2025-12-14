import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'DEV_SECRET_KEY', // 👈 BẮT BUỘC
    });
  }

  async validate(payload: any) {
     return {
      id: payload.sub,     // 🔥 RẤT QUAN TRỌNG
      phone: payload.phone,
    };
  }
}
