import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseCard } from "./course.entity";
import { CourseEvent } from "./events.entity";

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public creationDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    @Column()
    public name: string;

    @OneToMany(() => CourseCard, (courseCard: CourseCard) => courseCard.language)
    public courseCards: CourseCard[];

    @Column({ default: false })
    public isDeactivated: boolean;

    @OneToMany(() => CourseEvent, (cEvent: CourseEvent) => cEvent.language)
    public courseEvents: CourseEvent[];

    public constructor(language?: Partial<Language>) {
        if (language) {
            Object.assign(this, language);
        }
    }
}
