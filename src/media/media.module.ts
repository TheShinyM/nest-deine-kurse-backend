import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseCard } from "src/models/course.entity";
import { MediaController } from "./media.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CourseCard])],
    controllers: [MediaController],
})
export class MediaModule {
}
