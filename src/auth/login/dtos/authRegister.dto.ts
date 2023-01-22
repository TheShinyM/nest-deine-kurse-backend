import { User } from "src/auth/users.entity";
import { AuthDTO } from "./auth.dto";
export class AuthRegisterDTO {
    user: User;
    auth: AuthDTO;
    constructor(authRegister?: Partial<AuthRegisterDTO>) {
        if (authRegister) {
            Object.assign(this, authRegister);
        }
    }
}
