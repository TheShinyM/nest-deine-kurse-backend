import * as bcrypt from 'bcrypt';
import { CourseCard } from 'src/models/course.entity';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './roles/user-role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public insta: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    public password: string;

    @Column()
    public passwordHash: string;

    @Column({ default: UserRole.USER })
    public role: UserRole;

    @OneToMany(() => CourseCard, (course: CourseCard) => course.creator)
    public courses: CourseCard[];

    @Column({ default: true })
    public isDeactivated: boolean;

    @Column({ default: false })
    public isDeleted: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    public constructor(user?: Partial<User>) {
        if (user) {
            Object.assign(this, user);
        }
        if (user?.createdAt) {
            user.createdAt = this.createdAt;
        }
        if (user?.updatedAt) {
            user.updatedAt = this.updatedAt;
        }
    }

    @BeforeInsert()
    public async refreshPasswordHash(): Promise<void> {
        this.passwordHash = await bcrypt.hash(this.password, 10);
        this.password = undefined;
        this.createdAt = new Date();
    }

    public isAdmin(): boolean {
        if (this.role === UserRole.ADMIN) {
            return true;
        }
        return false;
    }

    public getFullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
