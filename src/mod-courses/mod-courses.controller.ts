import { Body, Controller, Param, Patch, Post, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventName } from "src/events/models/event-name.dto";
import { CourseCard } from 'src/models/course.entity';
import { CourseEvent } from "src/models/events.entity";
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './models/createCourseDTO';
import { RequestWithUser } from './models/request-with-user';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller("mod-courses")
export class ModCoursesController {
    public constructor(
        @InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>,
        @InjectRepository(CourseCard) private courseEventRepo: Repository<CourseEvent>
    ) {}

    @Post()
    public async createCourse(@Request() req: RequestWithUser, @Body() body: CreateCourseDTO): Promise<CourseCard> {
        const createdCourse: CourseCard = new CourseCard({
            ...body,
            creator: body.creator ? body.creator : req.user,
        });
        await this.courseEventRepo.save({
            eventName: EventName.COURSE_CREATED,
            courseCategoryId: createdCourse.courseCategoryId,
            languageId: createdCourse.languageId,
        });
        return this.courseRepo.save(createdCourse);
    }

    @Patch(":id")
    public async editCourse(@Param("id") id: number, @Body() body: CreateCourseDTO): Promise<CourseCard> {
        const course: CourseCard = await this.courseRepo.findOneByOrFail({ id: id });
        if (course) {
            await this.courseRepo.update(id, body);
            const updatedCourse: CourseCard = await this.courseRepo.findOneByOrFail({ id: id });
            await this.courseEventRepo.save({
                eventName: EventName.COURSE_PUBLISHED,
                courseCategoryId: updatedCourse.courseCategoryId,
                languageId: updatedCourse.languageId,
            });
            return updatedCourse;
        }
    }
}
