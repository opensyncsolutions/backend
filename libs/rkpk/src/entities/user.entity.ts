import { BeforeInsert, Column, Entity } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import { BadRequestException, Logger } from '@nestjs/common';
import { Owner } from './creator.entity';

@Entity('user')
export class User extends Owner {
  static plural = 'users';
  @Column({ name: 'phonenumber', unique: true })
  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string | null;

  @Column({ nullable: true, name: 'lastlogin' })
  @ApiPropertyOptional({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, unique: true })
  @ApiPropertyOptional({ nullable: true })
  email: string;

  @Column({ nullable: true, unique: true })
  @ApiPropertyOptional({ nullable: true })
  username: string;

  @Column({ nullable: true, default: 'default__rkpk_dp.png' })
  @ApiPropertyOptional({ nullable: true })
  dp: string;

  @Column()
  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Column()
  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @Column()
  salt: string;

  @Column({ default: true })
  active: boolean;

  @BeforeInsert()
  async beforeInsertTransaction() {
    if (this.password) {
      this.salt = await bcrypt.genSalt();
      this.password = await this.hashPassword(this.password, this.salt);
    }
  }

  async hashPassword(password: string, salt: string): Promise<any> {
    return bcrypt.hash(password, salt);
  }

  static getPassword = async (plainPassword: string): Promise<any> => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);
    return {
      salt,
      password,
    };
  };

  public static async verifyUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.getUser(username);
    if (
      user &&
      (await this.validatePassword(password, user.salt, user.password))
    ) {
      delete user.password;
      delete user.salt;
      return user;
    }
    Logger.log(username, 'INFO');
    throw new BadRequestException('Invalid Username or Password');
  }

  public static createSuperUser = async (user: any): Promise<void> => {
    try {
      const superUser = await User.findOne({ where: { id: user.id } });
      if (!superUser) {
        await User.save(user);
      }
    } catch (e) {}
  };

  public static getUser = async (username: string) => {
    const email = /^\S+@\S+$/;
    const isEmail = email.test(username);

    const user = await User.findOne({
      where: {
        [isEmail ? 'email' : Number(username) ? 'phoneNumber' : 'username']:
          username,
      },
    });

    return user;
  };
  public static async validatePassword(
    plainPassword: string,
    salt: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const passwordHash = await bcrypt.hash(plainPassword, salt);
    return passwordHash === hashedPassword;
  }

  public static async authenticateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const email = /^\S+@\S+$/;
    const isEmail = email.test(username);

    const user = await User.findOne({
      where: {
        [isEmail ? 'email' : Number(username) ? 'phoneNumber' : 'username']:
          username,
      },
    });

    if (
      user &&
      (await this.validatePassword(password, user.salt, user.password))
    ) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  }
}
