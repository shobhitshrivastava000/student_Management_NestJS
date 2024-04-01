import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';
import { MyMiddleware } from './middleware/auth.middleware';
import { StudentMiddleware } from './middleware/studentauth.midlleware';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AdminModule,
    StudentModule,
    ParentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StudentMiddleware).forRoutes(
      {
        path: 'student/getstudent/:studentid',
        method: RequestMethod.ALL,
      },
      { path: 'student/updatestudent/:studentid', method: RequestMethod.ALL },
      { path: 'admin/resetpassword', method: RequestMethod.ALL },
    );

    consumer.apply(MyMiddleware).forRoutes(
      //Middleware Routes for student
      { path: 'student/createstudent', method: RequestMethod.ALL },
      { path: 'student/getallstudent', method: RequestMethod.ALL },
      { path: 'student/deletestudent/:studentid', method: RequestMethod.ALL },

      //Middleware Routes for Parents
      { path: 'parent/addparent', method: RequestMethod.ALL },
      { path: 'parent/getparent/:parentid', method: RequestMethod.ALL },
      { path: 'parent/updateparent/:parentid', method: RequestMethod.ALL },
      { path: 'parent/deleteparent/:parentid', method: RequestMethod.ALL },
    );
  }
}
