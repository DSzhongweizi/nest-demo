import {pbkdf2Sync, randomBytes} from 'crypto';

// 随机盐
export function makeSalt(): string {
  return randomBytes(3).toString('base64');
}

/**
 * 使用盐加密明文密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  // 10000 代表迭代次数 16代表长度
  return pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64') 
}
