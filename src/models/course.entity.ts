import { User } from 'src/auth/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseCategory } from './courseCategory.entity';
import { Language } from './language.entity';

@Entity()
export class CourseCard {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public creationDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    @Column()
    public endDate: Date;

    @Column()
    public title: string;

    @Column({ nullable: true })
    public imageUrl: string;

    @Column()
    public languageId: number;

    @ManyToOne(() => Language, (language: Language) => language.courseCards, { eager: true })
    public language: Language;

    @Column()
    public courseCategoryId: number;

    @ManyToOne(() => CourseCategory, (courseCategory: CourseCategory) => courseCategory.courseCards, { eager: true })
    public courseCategory: CourseCategory;

    @Column({ default: false })
    public isExpired: boolean;

    @Column()
    public courseLink: string;

    @Column({ default: false })
    public wasDeleted: boolean;

    @ManyToOne(() => User, (user: User) => user.courses)
    public creator: User;

    // money people pay to get ranged higher
    @Column({ default: 0 })
    public promo: number;

    // how much discount the link gives
    @Column()
    public discount: number;

    @Column({ nullable: true })
    public imageName: string;

    public constructor(card?: Partial<CourseCard>) {
        if (card) {
            Object.assign(this, card);
        }
    }
}
