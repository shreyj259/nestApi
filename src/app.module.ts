import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { CatModule } from './Cat/cat.module';
import { Cat } from './Cat/cat.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auth.db',
      entities: [User,Cat],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:"secret",
      signOptions: {
        expiresIn: '1d'
      }
    }),
    CatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
