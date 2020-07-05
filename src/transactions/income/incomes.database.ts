import firebase from "../../services/firebase-service";
import { Income } from "./income.model";
import { Incomes } from "./incomes.interface";
import _ from "lodash";


export class IncomesDatabase {

    private db = firebase.database();
    private incomesRef = this.db.ref("server/saving-data/incomes");
    private incomes! : Incomes;
    

    constructor(){
        let aa :Incomes = {};
        this.incomesRef.on('value' || 'child_removed', (snap) => {
            snap && snap.val() && 
            _.map(snap.val(),(val , key) => {
                aa[key] = Income.fromApiResponse(val)            
            });
            this.incomes = aa; // Keep the local user object synced with the Firebase userRef 
        });
    }

    public async get(): Promise<Incomes> {
        return this.incomes
    }

    public async getById(id: string): Promise<Income> {
        return this.incomes[id];
    }


    public async getByAccount(accountId: string, month:number, year: number): Promise<Incomes> {
        console.log(month+ '/' + year);
        const filtered = Object.keys(this.incomes).reduce((toFilter: Incomes, key) => {
            const spending = this.incomes[key];
            if (spending.accountId == accountId &&
                (spending.date.getMonth() + 1) == month &&
                spending.date.getFullYear() == year) {
                toFilter[key] = spending
            };
            return toFilter;
        }, {});
        return filtered;
    }
    public async create(spending: Income): Promise<string>{
        try{
            const dateString = spending.date.toLocaleDateString();
            
            return this.incomesRef.push({
                amount: spending.amount.toDecimal(),
                currency: spending.amount.currency,
                accountId: spending.accountId,
                description: spending.description,
                date: dateString
            }).toString();
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    
    public async update(id:string, spending:Income): Promise<void> {
        const dateString = spending.date.toLocaleDateString();
        return this.incomesRef.child(id).set({
            amount: spending.amount.toDecimal(),
            currency: spending.amount.currency,
            accountId: spending.accountId,
            description: spending.description,
            date: dateString
        });
    }

    public async remove(id: string): Promise<void> {
        delete this.incomes[id];
        return this.incomesRef.child(id).set(null).then(function() {
        }).catch((error) => {throw error});
    }
}