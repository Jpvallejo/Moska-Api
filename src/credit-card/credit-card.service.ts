import { CreditCardDatabase } from "./credit-card.database";
import { CreditCard, CreditCards } from "./credit-card.model";


export class CreditCardService {
    private db = new CreditCardDatabase();

    public async create(account: CreditCard): Promise<string> {
        return this.db.create(account);
    }

    public async update(id:string, account: CreditCard): Promise<void> {
        return this.db.update(id, account);
    }

    public async remove(id: string): Promise<void> {
        return this.db.remove(id);
    }

    public async getAll(): Promise<CreditCards> {
        return this.db.get();
    }

    public async get(id:string): Promise<CreditCard> {
        return this.db.getById(id);
    }

    public async getByUser(userId: string): Promise<CreditCards> {
        return this.db.getByUser(userId);
    }
}