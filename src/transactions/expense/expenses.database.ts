import firebase from "../../services/firebase-service";
import { Expense } from "./expense.model";
import { Expenses } from "./expenses.interface";
import _ from "lodash";


export class ExpensesDatabase {

    private db = firebase.database();
    private expensesRef = this.db.ref("server/saving-data/expenses");
    private expenses! : Expenses;
    

    constructor(){
        let aa :Expenses = {};
        this.expensesRef.on('value' || 'child_removed', (snap) => {
            snap && snap.val() && 
            _.map(snap.val(),(val , key) => {
                aa[key] = Expense.fromApiResponse(val)            
            });
            this.expenses = aa; // Keep the local user object synced with the Firebase userRef 
        });
    }

    public async get(): Promise<Expenses> {
        return this.expenses
    }

    public async getById(id: string): Promise<Expense> {
        return this.expenses[id];
    }


    public async getByAccount(accountId: string, month:number, year: number): Promise<Expenses> {
        console.log(month+ '/' + year);
        const filtered = Object.keys(this.expenses).reduce((toFilter: Expenses, key) => {
            const spending = this.expenses[key];
            if (spending.accountId == accountId &&
                (spending.date.getMonth() + 1) == month &&
                spending.date.getFullYear() == year) {
                toFilter[key] = spending
            };
            return toFilter;
        }, {});
        return filtered;
    }
    public async create(spending: Expense): Promise<string>{
        try{
            const dateString = spending.date.toLocaleDateString();
            
            return this.expensesRef.push({
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
    
    public async update(id:string, spending:Expense): Promise<void> {
        const dateString = spending.date.toLocaleDateString();
        return this.expensesRef.child(id).set({
            amount: spending.amount.toDecimal(),
            currency: spending.amount.currency,
            accountId: spending.accountId,
            description: spending.description,
            date: dateString
        });
    }

    public async remove(id: string): Promise<void> {
        delete this.expenses[id];
        return this.expensesRef.child(id).set(null).then(function() {
        }).catch((error) => {throw error});
    }
}