import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCard } from 'src/models/course.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Controller('courses')
export class CoursesController {
    public constructor(
        @InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>
    ) {}

    @Get()
    public async getAllCourses(): Promise<CourseCard[]> {
        return this.courseRepo.find({ where: { wasDeleted: false, imageUrl: Not(IsNull()) }});
    }
}
