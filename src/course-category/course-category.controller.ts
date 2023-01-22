import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { CourseCategory } from "src/models/courseCategory.entity";
import { Repository } from "typeorm";
import { CreateCategoryDTO } from "./enums/category.dto";

@Controller("course-category")
export class CourseCategoryController {
    public constructor(@InjectRepository(CourseCategory) private categoryRepo: Repository<CourseCategory>) {}

    @Get("all")
    public getAllCategorys(): Promise<CourseCategory[]> {
        return this.categoryRepo.find({ where: { isDeactivated: false } });
    }

    @Post()
    public async createCategory(@Body() category: CreateCategoryDTO): Promise<CourseCategory[]> {
        const cate: CourseCategory = this.categoryRepo.create(category);
        await this.categoryRepo.save(cate);
        return this.categoryRepo.find({ where: { isDeactivated: false } });
    }
}
