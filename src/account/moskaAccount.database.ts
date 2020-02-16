import firebase from "firebase-admin";
import { MoskaAccounts, MoskaAccount } from "./moskaAccount.interface";

export class AccountDatabase {
    private db = firebase.database();
    private accountsRef = this.db.ref("server/saving-data/accounts");
    private accounts! : MoskaAccounts;
    
    constructor(){
        this.accountsRef.on('value', (snap) => {
            this.accounts = snap && snap.val(); // Keep the local user object synced with the Firebase userRef 
           });
    }

    public async get(): Promise<MoskaAccounts> {
        return this.accounts
    }

    public async getById(id: string): Promise<MoskaAccount> {
        return this.accounts[id];
    }

    public async getByUser(userId: string): Promise<MoskaAccounts> {
        const filtered = Object.keys(this.accounts).reduce((filtered: MoskaAccounts, key) => {
            if (this.accounts[key].userId == userId) filtered[key] = this.accounts[key];
            return filtered;
        }, {});
        return filtered;
    }
    public async create(account: MoskaAccount): Promise<string>{
        return this.accountsRef.push(account).toString();
    }

    public async update(id:string, account:MoskaAccount): Promise<void> {
        return this.accountsRef.child(id).set(account);
    }

    public async remove(id: string): Promise<void> {
        return this.accountsRef.child(id).remove();
    }
}