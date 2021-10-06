import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async signup(body: CatRequestDto) {
    const { email, password, name } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('The email is already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
