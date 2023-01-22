import { UserRole } from "src/auth/roles/user-role.entity";

export interface AuthDTO {
    token: string;
    firstName: string;
    lastName: string;
    roles: UserRole;
}
