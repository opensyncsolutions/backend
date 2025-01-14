import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import { BadRequestException, Logger } from '@nestjs/common';
import { DateEntity } from '../general/date.entity';
import { UserGroup } from './user.group.entity';
import { Role } from './role.entity';
import { OrganisationUnit } from '../metadata/organisationUnit.entity';

@Entity('user')
export class User extends DateEntity {
  static plural = 'users';
  static READ = 'READ_USERS';
  static ADD = 'ADD_USERS';
  static DELETE = 'DELETE_USERS';
  static UPDATE = 'UPDATE_USERS';

  @Column({ name: 'phonenumber', nullable: true })
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

  @Column({ nullable: true, default: 'default__opensync_dp.png' })
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
  @ApiPropertyOptional()
  active: boolean;

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.users, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'usergroupaccess',
    joinColumn: { referencedColumnName: 'id', name: 'user' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'group' },
  })
  @ApiPropertyOptional({ type: UserGroup })
  userGroups: UserGroup[];

  @ManyToMany(() => OrganisationUnit, (organisationUnit) => organisationUnit, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'userous',
    joinColumn: { referencedColumnName: 'id', name: 'user' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'ou' },
  })
  @ApiPropertyOptional({ type: OrganisationUnit })
  organisationUnits: OrganisationUnit[];

  @ManyToMany(() => Role, (role) => role, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'userrole',
    joinColumn: { referencedColumnName: 'id', name: 'user' },
    inverseJoinColumn: { referencedColumnName: 'id', name: 'role' },
  })
  @ApiPropertyOptional({ type: Role })
  roles: Role[];

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

  public static addOu = async (user: any): Promise<void> => {
    try {
      await User.save(user);
    } catch (e) {
      console.log(e);
    }
  };

  public static getUser = async (username: string) => {
    const email = /^\S+@\S+$/;
    const isEmail = email.test(username);

    const user = await User.findOne({
      where: {
        [isEmail ? 'email' : Number(username) ? 'phoneNumber' : 'username']:
          username,
      },
      relations: [
        'roles',
        'roles.privileges',
        'userGroups',
        'organisationUnits',
      ],
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
      relations: [
        'roles',
        'roles.privileges',
        'userGroups',
        'organisationUnits',
      ],
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
