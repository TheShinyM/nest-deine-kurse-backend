import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseCardModule } from './courses/courseCard.module';
import { LanguageModule } from "./language/language.module";
import { CourseCategoryModule } from "./course-category/course-category.module";
import { MediaModule } from "./media/media.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "37.114.47.88",
            port: 3306,
            database: "dk_website_dev",
            username: "dk_website",
            password: "@8.KJ.hkmpi9nDVW*nGgyxNYGpb8rRcJpC-",
            autoLoadEntities: true,
            synchronize: true,
        }),
        MulterModule.register({
            dest: "./uploads",
        }),
        AuthModule,
        CourseCardModule,
        LanguageModule,
        CourseCategoryModule,
        MediaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
