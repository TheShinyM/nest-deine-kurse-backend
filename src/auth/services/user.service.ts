import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users.entity";

@Injectable()
export class UserService {
    public constructor(@InjectRepository(User) public repo: Repository<User>) {}

    public async getByEmail(email: string): Promise<User> {
        const user = await this.getWithEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    public async getWithEmail(email: string): Promise<User> {
        return this.repo.findOne({
            where: [
                {
                    email: email.toLocaleLowerCase()
                }
            ]
        });
    }
    public async throwExceptionIfExist(user: User, id: number): Promise<void> {
        if (user.email !== undefined) {
            const email = user.email;
            const lastName = user.lastName;
            const firstName = user.firstName;
            const insta = user.insta;
            const userExists = await this.repo
                .createQueryBuilder()
                .where("email = :email", { email })
                .orWhere("lastName = :lastName", { lastName })
                .orWhere("firstName = :firstName", { firstName })
                .orWhere("insta = :insta", { insta })
                .getOne();
            if (userExists && (id == null || userExists?.id !== id)) {
                throw new ConflictException("User already exists");
            }
        }
        if (user.id !== undefined) {
            const userExist = await this.repo.findOne({ where: { id: id } });
            if (userExist && (id === null || userExist.id !== id)) {
                throw new ConflictException("User already exists");
            }
        }
    }
    public async save(user): Promise<User> {
        return this.repo.save(user);
    }
}
