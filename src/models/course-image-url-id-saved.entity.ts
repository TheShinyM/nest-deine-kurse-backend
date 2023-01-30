import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CourseImageUrlIdSaved {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public creationDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    public courseId: number;

    @Column()
    public imageUrl: string;
}
