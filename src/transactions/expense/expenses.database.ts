import firebase from "../../services/firebase-service";
import { Expense } from "./expense.interface";
import { Expenses } from "./expenses.interface";


export class ExpensesDatabase {

    private db = firebase.database();
    private expensesRef = this.db.ref("server/saving-data/expenses");
    private expenses! : Expenses;
    
    constructor(){
        this.expensesRef.on('value', (snap) => {
            this.expenses = snap && snap.val(); // Keep the local user object synced with the Firebase userRef 
           });
    }

    public async get(): Promise<Expenses> {
        return this.expenses
    }

    public async getById(id: string): Promise<Expense> {
        return this.expenses[id];
    }

    public async getByAccount(accountId: string) {
        // TODO
    }
    public async create(expense: Expense): Promise<string>{
        return this.expensesRef.push(expense).toString();
    }

    public async update(id:string, expense:Expense): Promise<void> {
        return this.expensesRef.child(id).set(expense);
    }

    public async remove(id: string): Promise<void> {
        return this.expensesRef.child(id).set(null);
    }
}