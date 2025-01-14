import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege, Role, User } from '@app/opensync';
import { UserController } from './user/controllers/user.controller';
import { UserService } from './user/services/user.service';
import { AuthController } from './user/controllers/auth.controller';
import { RoleController } from './role/controllers/role.controller';
import { RoleService } from './role/services/role.service';
import { PrivilegeController } from './privilege/controllers/privilege.controller';
import { PrivilegeService } from './privilege/services/privilege.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Privilege])],
  controllers: [
    AuthController,
    RoleController,
    PrivilegeController,
    UserController,
  ],
  providers: [UserService, RoleService, PrivilegeService],
})
export class AuthModule {}
