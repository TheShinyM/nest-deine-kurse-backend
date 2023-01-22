import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRole } from 'src/auth/roles/user-role.entity';
import { CourseCard } from 'src/models/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './models/createCourseDTO';
import { RequestWithUser } from './models/request-with-user';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('mod-courses')
export class ModCoursesController {
  public constructor(
    @InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>
  ) {}

  @Post()
  public createCourse(
    @Request() req: RequestWithUser,
    @Body() body: CreateCourseDTO
  ): Promise<CourseCard> {
    const createdCourse: CourseCard = new CourseCard({
      ...body,
      creator: body.creator ? body.creator : req.user,
    });
    return this.courseRepo.save(createdCourse);
  }
}
