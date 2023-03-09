import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
  TypeOrmModule.forFeature([Cat]),
  JwtModule.register({
    secret:"secret",
    signOptions: {
      expiresIn: '1d'
    }
  })
],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
