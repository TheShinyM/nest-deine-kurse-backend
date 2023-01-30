import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEvent } from "src/models/events.entity";
import { EventsController } from "./events.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEvent])],
    controllers: [EventsController],
})
export class EventsModule {}
