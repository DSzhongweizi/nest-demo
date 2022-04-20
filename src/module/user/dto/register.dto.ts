import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterDTO{

  @ApiProperty({description:"手机号，唯一"})
  @IsNotEmpty({message:"请输入手机号"})
  readonly mobile:string

  @ApiProperty({description:"用户密码"})
  @IsNotEmpty({message:"请输入密码"})
  readonly password:string
}