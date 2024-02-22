import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege, Role, User } from '@app/rkpk';
import { UserController } from './user/controllers/user.controller';
import { UserService } from './user/services/user.service';
import { AuthController } from './user/controllers/auth.controller';
import { RoleController } from './role/controllers/role.controller';
import { RoleService } from './role/services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Privilege])],
  controllers: [UserController, AuthController, RoleController],
  providers: [UserService, RoleService],
})
export class AuthModule {}
