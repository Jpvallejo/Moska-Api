import firebase from "firebase-admin";
import * as serviceAccount from "../../../serviceAccount.json";
import { Expense } from "./expense.interface";


export class ExpensesDatabase {

    constructor(){
        
    }

    private db = firebase.database();
    private expensesRef = this.db.ref("server/saving-data/expenses");

    public async create(expense: Expense): Promise<void>{ 
        const id = expense.id.toString();
        return this.expensesRef.child(id).set(expense);
    }

    public async remove(id: number): Promise<void> {
        return this.expensesRef.child(id.toString()).remove();
    }
}