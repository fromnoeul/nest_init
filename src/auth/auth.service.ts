import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catRepo: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    const cat = await this.catRepo.findCatByEmail(email);

    //* check if user exists, which matches given email.
    if (!cat) {
      throw new UnauthorizedException('Check your email and password.');
    }

    //* check password of the user matches given password.
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('Check your email and password.');
    }

    const payload = { email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
