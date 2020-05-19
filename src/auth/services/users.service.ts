import { UserDatabase } from "../user.database";
import { User, PartialUser } from "../models/user.interface";
import { v4 as uuidv4 } from "uuid";

export class UsersService {
    private db = new UserDatabase();
    
    public async create(partialUser: PartialUser): Promise<string> {
        const user = {
            ...partialUser,
            id: uuidv4()
        }
        return this.db.create(user);
    }
    public async getUser(user: PartialUser): Promise<User> {
        const userId = await this.db.getUserId(user);
        if(!userId) {
            const newId = await this.create(user);
            return this.db.getById(newId)
        } else {
            return this.db.getById(userId);
        }
    }

    public async getUserId(user: PartialUser): Promise<string> {
        return this.db.getUserId(user).then((userId) => {
            if(!userId) {
                return this.create(user);
            } else {
                return userId;
            }
        });
    }
}