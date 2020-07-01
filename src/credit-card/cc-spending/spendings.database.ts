import firebase from "../../services/firebase-service";
import _ from "lodash";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpending } from "./cc-spending.model";

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

    public async getByAccount(accountId: string): Promise<CreditCardSpendings> {
        const filtered = Object.keys(this.spendings).reduce((toFilter: CreditCardSpendings, key) => {
            if (this.spendings[key].creditCardId == accountId) toFilter[key] = this.spendings[key];
            return toFilter;
        }, {});
        return filtered;
    }
    public async create(spending: CreditCardSpending): Promise<string>{
        try{
            const dateString = spending.date.toLocaleDateString();

            return this.spendingsRef.push({
                amount: spending.amount.toDecimal(),
                currency: spending.amount.currency,
                creditCardId: spending.creditCardId,
                description: spending.description,
                date: dateString
            }).toString();
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    public async update(id:string, spending:CreditCardSpending): Promise<void> {
        return this.spendingsRef.child(id).set(spending);
    }

    public async remove(id: string): Promise<void> {
        return this.spendingsRef.child(id).remove();
    }
}