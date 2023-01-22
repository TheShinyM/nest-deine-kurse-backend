import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseCategory } from "src/models/courseCategory.entity";
import { CourseCategoryController } from "./course-category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CourseCategory])],
    controllers: [CourseCategoryController],
})
export class CourseCategoryModule {}
