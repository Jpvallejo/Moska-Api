import firebase from "../../services/firebase-service";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpending } from "./cc-spending.interface";

export class CreditCardSpendingsDatabase {

    private db = firebase.database();
    private spendingsRef = this.db.ref("server/saving-data/cc-spendings");
    private spendings! : CreditCardSpendings;

    constructor(){
        this.spendingsRef.on('value', (snap) => {
            this.spendings = snap && snap.val(); // Keep the local user object synced with the Firebase userRef 
           });
    }

    public async get(): Promise<CreditCardSpendings> {
        return this.spendings
    }

    public async getById(id: string): Promise<CreditCardSpending> {
        return this.spendings[id];
    }

    public async getByAccount(accountId: string) {
        // TODO
    }
    public async create(spending: CreditCardSpending): Promise<string>{
        return this.spendingsRef.push(spending).toString();
    }

    public async update(id:string, spending:CreditCardSpending): Promise<void> {
        return this.spendingsRef.child(id).set(spending);
    }

    public async remove(id: string): Promise<void> {
        return this.spendingsRef.child(id).remove();
    }
}