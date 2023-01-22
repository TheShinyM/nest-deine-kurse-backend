import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModCoursesController } from 'src/mod-courses/mod-courses.controller';
import { CourseCard } from 'src/models/course.entity';
import { CoursesController } from './courses.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CourseCard])],
    controllers: [CoursesController, ModCoursesController],
})
export class CourseCardModule {}
