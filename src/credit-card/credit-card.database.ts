import firebase from "firebase-admin";
import { CreditCards, CreditCard } from "./credit-card.model";


export class CreditCardDatabase {
    private db = firebase.database();
    private accountsRef = this.db.ref("server/saving-data/credit-cards");
    private accounts! : CreditCards;
    
    constructor(){
        this.accountsRef.on('value', (snap) => {
            this.accounts = snap && snap.val(); // Keep the local user object synced with the Firebase userRef 
        });
    }

    public async get(): Promise<CreditCards> {
        return this.accounts
    }

    public async getById(id: string): Promise<CreditCard> {
        return this.accounts[id];
    }

    public async getByUser(userId: string): Promise<CreditCards> {
        const filtered = Object.keys(this.accounts).reduce((filtered: CreditCards, key) => {
            if (this.accounts[key].user == userId) filtered[key] = this.accounts[key];
            return filtered;
        }, {});
        return filtered;
    }
    public async create(account: CreditCard): Promise<string>{
        return this.accountsRef.push(account).toString();
    }

    public async update(id:string, account:CreditCard): Promise<void> {
        return this.accountsRef.child(id).set(account);
    }

    public async remove(id: string): Promise<void> {
        return this.accountsRef.child(id).remove();
    }
}