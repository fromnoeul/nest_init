import { Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  getCurrentCat() {
    return 'get current cat';
  }

  @Post()
  async signUp() {
    return 'sign up';
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploading';
  }
}
