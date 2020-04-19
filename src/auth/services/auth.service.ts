import { User, PartialUser } from "../models/user.interface";
import { UsersService } from "./users.service";

export class AuthService {
    private usersService = new UsersService();
    public async getUser(user: PartialUser): Promise<User> {
        return this.usersService.getUser(user);
    }
}