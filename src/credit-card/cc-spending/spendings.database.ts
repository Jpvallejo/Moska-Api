import firebase from "../../services/firebase-service";
import _ from "lodash";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpending } from "./cc-spending.model";

export class CreditCardSpendingsDatabase {
    private db = firebase.database();
    private spendingsRef = this.db.ref("server/saving-data/cc-spendings");
    private spendings! : CreditCardSpendings;

    constructor(){
        let aa :CreditCardSpendings = {};
        this.spendingsRef.on('value' || 'child_removed', (snap) => {
            console.log('Updated');
            snap && snap.val() && 
            _.map(snap.val(),(val , key) => {
                aa[key] = CreditCardSpending.fromApiResponse(val)            
            });
            this.spendings = aa; // Keep the local user object synced with the Firebase userRef 
        });
    }

    public async get(): Promise<CreditCardSpendings> {
        return this.spendings
    }

    public async getById(id: string): Promise<CreditCardSpending> {
        return this.spendings[id];
    }

    public async getByAccount(accountId: string, month:number, year: number): Promise<CreditCardSpendings> {
        console.log(month+ '/' + year);
        const filtered = Object.keys(this.spendings).reduce((toFilter: CreditCardSpendings, key) => {
            const spending = this.spendings[key];
            if (spending.creditCardId == accountId &&
                (spending.date.getMonth() + 1) == month &&
                spending.date.getFullYear() == year) {
                toFilter[key] = spending
            };
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
        const dateString = spending.date.toLocaleDateString();
        return this.spendingsRef.child(id).set({
            amount: spending.amount.toDecimal(),
            currency: spending.amount.currency,
            creditCardId: spending.creditCardId,
            description: spending.description,
            date: dateString
        });
    }

    public async remove(id: string): Promise<void> {
        delete this.spendings[id];
        return this.spendingsRef.child(id).set(null).then(function() {
        }).catch((error) => {throw error});
    }
}