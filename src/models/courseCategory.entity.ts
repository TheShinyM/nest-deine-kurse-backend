import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { CourseCard } from "./course.entity";

@Entity()
export class CourseCategory {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public creationDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    @Column()
    public name: string;

    @Column({ default: false })
    public isDeactivated: boolean;

    @OneToMany(() => CourseCard, (courseCard: CourseCard) => courseCard.courseCategory)
    public courseCards: CourseCard[];

    public constructor(category?: Partial<CourseCategory>) {
        if (category) {
            Object.assign(this, category);
        }
    }
}
