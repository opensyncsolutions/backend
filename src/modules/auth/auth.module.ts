import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/rkpk';
import { UserController } from './user/controllers/user.controller';
import { UserService } from './user/services/user.service';
import { AuthController } from './user/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class AuthModule {}
