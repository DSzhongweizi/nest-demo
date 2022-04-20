import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException('异常', HttpStatus.FORBIDDEN);;
  }
}
