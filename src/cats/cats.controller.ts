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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: 'Get current Cat' })
  @Get()
  getCurrentCat() {
    return 'get current cat';
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success!',
    type: ReadOnlyCatDto,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }

  @ApiOperation({ summary: 'Sign in' })
  @Post('login')
  login() {
    return 'login';
  }

  @ApiOperation({ summary: 'Sign out' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: 'Upload image' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploading';
  }
}
