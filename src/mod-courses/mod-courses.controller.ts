import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "src/auth/roles/user-role.entity";
import { EventName } from "src/events/models/event-name.dto";
import { CourseCard } from "src/models/course.entity";
import { CourseEvent } from "src/models/events.entity";
import { Repository } from "typeorm";
import { CreateCourseDTO } from "./models/createCourseDTO";
import { RequestWithUser } from "./models/request-with-user";

@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseGuards(AuthGuard("jwt"))
@Controller("mod-courses")
export class ModCoursesController {
    public constructor(
        @InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>,
        @InjectRepository(CourseEvent) private courseEventRepo: Repository<CourseEvent>
    ) {}
    // @InjectRepository(CourseCard) private courseEventRepo: Repository<CourseEvent>

    @Post()
    public async createCourse(@Request() req: RequestWithUser, @Body() body: CreateCourseDTO): Promise<CourseCard> {
        if (req.user.role !== UserRole.USER) {
            const createdCourse: CourseCard = new CourseCard({
                ...body,
                creator: body.creator ? body.creator : req.user,
                creatorId: body.creator ? body.creator.id : req.user.id ?? 3,
            });
            await this.courseEventRepo.save({
                eventName: EventName.COURSE_CREATED,
                courseCategoryId: createdCourse.courseCategoryId,
                languageId: createdCourse.languageId,
            });
            return this.courseRepo.save(createdCourse);
        }
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

    @Get(":id")
    public async getCourse(@Param("id") id: number, @Request() req: RequestWithUser): Promise<CourseCard> {
        if (req.user.role !== UserRole.USER) {
            const foundCourse: CourseCard = await this.courseRepo.findOneOrFail({ where: { id: id } });
            if (
                req.user.id === foundCourse.creatorId ||
                req.user.role === UserRole.ADMIN ||
                req.user.role === UserRole.MOD
            ) {
                return foundCourse;
            }
        }
    }
}
