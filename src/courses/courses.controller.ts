import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestWithUser } from "src/mod-courses/models/request-with-user";
import { CourseCard } from "src/models/course.entity";
import { IsNull, Not, Repository } from "typeorm";

@Controller("courses")
export class CoursesController {
    public constructor(@InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>) {}

    @Get()
    public async getAllCourses(): Promise<CourseCard[]> {
        return this.courseRepo.find({ where: { wasDeleted: false, imageUrl: Not(IsNull()) } });
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("my")
    public async getMyCourses(@Request() req: RequestWithUser): Promise<CourseCard[]> {
        console.log("req user", req.user);

        if (req.user) {
            return this.courseRepo.find({
                where: { wasDeleted: false, imageUrl: Not(IsNull()), creatorId: req.user.id },
            });
        }
    }
}
