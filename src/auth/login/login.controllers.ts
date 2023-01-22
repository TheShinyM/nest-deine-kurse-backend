import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthDTO } from "./dtos/auth.dto";
import { LoginDTO } from "./dtos/login.dto";

@Controller("login")
export class LoginController {
    public constructor(private authService: AuthService) {}

    @Post()
    public async login(@Body() body: LoginDTO): Promise<AuthDTO> {
        return this.authService.login(body.email, body.password);
    }
}
