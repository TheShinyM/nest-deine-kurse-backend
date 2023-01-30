import { EventName } from "src/events/models/event-name.dto";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseCategory } from "./courseCategory.entity";
import { Language } from "./language.entity";


@Entity()
export class CourseEvent {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public creationDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    @Column()
    public eventName: EventName;

    // many
    @Column()
    public courseId: number;

    // Sprache
    @Column()
    public languageId: number;

    @ManyToOne(() => Language, (language: Language) => language.courseEvents)
    public language: Language;

    @Column()
    public courseCategoryId: number;

    @ManyToOne(() => CourseCategory, (courseCategory: CourseCategory) => courseCategory.courseEvents)
    public courseCategory: CourseCategory;
}
