import { CreditCardSpending } from "./cc-spending.interface";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpendingsDatabase } from "./spendings.database";

export class CreditCardSpendingsService {
    private db = new CreditCardSpendingsDatabase();

    public async create(record: CreditCardSpending): Promise<string> {
        return this.db.create(record);
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