import { User, PartialUser } from "../models/user.interface";
import { UsersService } from "./users.service";
import { decodeSession } from "./jwt.service";

export class AuthService {
    private usersService = new UsersService();
    public async getUser(user: PartialUser): Promise<User> {
        return this.usersService.getUser(user);
    }

    public async getUserIdFromToken(token: string) {
        const jwtToken = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';
        const decoded: any = decodeSession(jwtToken, token);
        console.log(decoded);
        return decoded.session.id;
    }
}