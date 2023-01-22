import { Body, Controller, Post } from "@nestjs/common";
import { AuthRegisterDTO } from "../login/dtos/authRegister.dto";
import { RegisterDTO } from "../login/dtos/register.dto";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { User } from "../users.entity";

@Controller("register")
export class RegisterController {
    public constructor(private userService: UserService, private authService: AuthService) {}

    @Post()
    public async register(@Body() body: RegisterDTO) {
        const user: User = new User(body);
        await this.userService.throwExceptionIfExist(user, user.id);
        const createdUser = await this.userService.save(user);
        const token = await this.authService.login(createdUser.email, body.password);
        delete createdUser.passwordHash;
        return new AuthRegisterDTO({ user: createdUser, auth: token });
    }
}
