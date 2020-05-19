import { CreditCardSpending } from "./cc-spending.interface";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpendingsDatabase } from "./spendings.database";
import { addMonth } from "ts-date";
import { Money } from "ts-money";

export class CreditCardSpendingsService {
    private db = new CreditCardSpendingsDatabase();

    public async create(record: CreditCardSpending): Promise<string> {
        return this.db.create(record);
    }

    public async createWithPayments(record: any, payments: number) {
        const spending = CreditCardSpending.fromApiResponse(record);
        const initialDate = spending.date;
        console.log(spending.date.getMonth());
        const amount = spending.amount.divide(payments);
        for(let i = 0; i < payments; i++){
            spending.date = addMonth(initialDate, i);
            console.log(spending.date);
            spending.amount = amount;
            this.db.create(spending);
        }
    }

    public async update(id:string, record: CreditCardSpending): Promise<void> {
        return this.db.update(id, record);
    }

    public async remove(id: string): Promise<void> {
        return this.db.remove(id);
    }

    public async getAll(): Promise<CreditCardSpendings> {
        return this.db.get();
    }

    public async get(id:string): Promise<CreditCardSpending> {
        return this.db.getById(id);
    }
}