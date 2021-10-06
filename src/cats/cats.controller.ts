import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  getCurrentCat() {
    return 'get current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
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
