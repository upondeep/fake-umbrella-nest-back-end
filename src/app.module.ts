import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:30000/fake-umbrella'),
    // MongooseModule.forRoot('mongodb://localhost:30000/fake-umbrella'),
    MongooseModule.forRoot('mongodb://docker.for.win.localhost:27017/fake-umbrella'),
    // MongooseModule.forRoot('mongodb://localhost:27017/fake-umbrella'),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
