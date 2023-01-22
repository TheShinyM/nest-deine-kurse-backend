import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCard } from 'src/models/course.entity';
import { Repository } from 'typeorm';

@Controller('courses')
export class CoursesController {
  public constructor(
    @InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>
  ) {}

  @Get()
  public async getAllCourses(): Promise<CourseCard[]> {
    this.courseRepo.find({ where: { wasDeleted: false }});
    return [
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Best Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Senf Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Best Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Best Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Best Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Best Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
      new CourseCard({
        endDate: new Date(),
        imageUrl:
          'https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png',
        title: 'Best Course',
        courseLink:
          'https://www.udemy.com/course/microsoft-excel-learn-ms-excel-for-data-analysis/?couponCode=A4E9A85A2CC4BBBF20BD',
      }),
    ];
  }
}
