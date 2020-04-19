import firebase from "../services/firebase-service";
import { User, PartialUser } from "./models/user.interface";
import { Users } from "./models/users.interface";

export class UserDatabase {
    private db = firebase.database();
    private usersRef = this.db.ref("server/saving-data/users");
    private users! : Users;
    
    constructor(){
        this.usersRef.on('value', (snap) => {
            this.users = snap && snap.val(); // Keep the local user object synced with the Firebase userRef 
        });
    }

    public async create(user: User): Promise<string>{
        return this.usersRef.push(user).toString();
    }

    public async getUserId(requested: PartialUser) {
        if (!this.users) {
            return undefined;
        }
        return Object.keys(this.users).find(key => this.findUserId(key,requested));
    }

    public async getById(id: string): Promise<User> {
        return this.users[id];
    }

    private findUserId(key: string, userToFind: PartialUser) {
        const actualUser = this.users[key];
        return actualUser.email === userToFind.email;
                                        // this.users[key].email === requested.email &&
                                        // this.users[key].firstName === requested.firstName &&
                                        // this.users[key].email === requested.lastName
    };
}
