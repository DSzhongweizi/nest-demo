

import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:"user"})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:number

  // 手机号
  @Column("varchar")
  mobile: string;

  // 头像
  @Column({default:""})
  avatars:string

  // 角色
  @Column("simple-enum",{ enum: ['default','student', 'parent', 'hteacher', 'uteacher'] })
  role:string

  // 密码
  @Column('varchar', { select: false })
  password: string;

  // 密码盐
  @Column('varchar', { select: false })
  salt: string;
  
  // 创建时间
  @CreateDateColumn()
  createTime: Date

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date
}

