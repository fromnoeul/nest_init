import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';
@Injectable()
export class CatsService {
  constructor(private readonly catsRepo: CatsRepository) {}

  async signup(body: CatRequestDto) {
    const { email, password, name } = body;
    const isCatExist = await this.catsRepo.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('The email is already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catsRepo.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);

    const newCat = await this.catsRepo.findByIdAndUpdateImg(cat.id, fileName);
    console.log(newCat);
    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepo.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }
}
