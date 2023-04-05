import { User } from "src/auth/users.entity";
import { CourseCategory } from "src/models/courseCategory.entity";
import { Language } from "src/models/language.entity";

export interface CreateCourseDTO {
    endDate: Date;
    title: string;
    imageUrl: string;
    courseLink: string;
    creator: User;
    discount: number;
    promo: number;
    courseCategory: CourseCategory;
    language: Language;
}
