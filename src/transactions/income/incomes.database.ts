import firebase from "firebase-admin";
import { Income } from "./income.interface";
import { Incomes } from "./incomes.interface";


export class IncomesDatabase {
    
    
    private db = firebase.database();
    private incomesRef = this.db.ref("server/saving-data/incomes");
    private incomes! : Incomes;
    
    constructor(){
        this.incomesRef.on('value', (snap) => {
            this.incomes = snap && snap.val(); // Keep the local user object synced with the Firebase userRef 
           });
    }

    public async get(): Promise<Incomes> {
        return this.incomes
    }

    public async getById(id: string): Promise<Income> {
        return this.incomes[id];
    }

    public async getByAccount(accountId: string) {
        // TODO
    }
    public async create(income: Income): Promise<string>{
        return this.incomesRef.push(income).toString();
    }

    public async update(id:string, income:Income): Promise<void> {
        return this.incomesRef.child(id).set(income);
    }

    public async remove(id: string): Promise<void> {
        return this.incomesRef.child(id).remove();
    }
}