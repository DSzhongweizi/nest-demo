import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  /**
   * 用户注册
   * @param registerDto
   */
  @ApiBody({ type: RegisterDTO })
  @Post('register')
  register(@Body() registerDto: RegisterDTO): Promise<any> {
    return this.userService.register(registerDto);
  }

  /**
   * 用户登录
   */
  @ApiBody({ type: LoginDTO })
  @Post('login')
  login(@Body() loginDto: LoginDTO): Promise<any> {
    return this.userService.login(loginDto);
  }

  /**
   * 用户信息
   */
  @ApiBearerAuth("token")
  @UseGuards(AuthGuard('jwt'))
  @Get("info")
  getInfo(){
    return "sss"
  }
}
