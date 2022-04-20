import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { encryptPassword, makeSalt } from 'src/common/cryptogram.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * 注册
   * @param registerDto
   * @returns
   */
  async register(registerDto: RegisterDTO): Promise<any> {
    const { mobile, password } = registerDto;

    // 防止重复注册
    const hasUser = await this.userRepository.findOne({ where: { mobile } });
    if (hasUser) throw new BadRequestException({ msg: '用户已存在' });
    const newUser: UserEntity = new UserEntity();
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;

    return await this.userRepository.save(newUser);
  }
  /**
   * 登录
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDTO): Promise<any> {
    const { mobile, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new BadRequestException({ msg: '用户不存在' });
    }

    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new BadRequestException({ msg: '密码错误' });
    }
    // 签发token
    return {
      token: this.jwtService.sign({
        id: user.id,
        mobile: user.mobile,
      }),
    };
  }
}
