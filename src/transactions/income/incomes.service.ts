import { Income } from "./income.interface";
import { Incomes } from "./incomes.interface";
import { IncomesDatabase } from "./incomes.database";

export class IncomesService {
    private db = new IncomesDatabase();

    public async create(income: Income): Promise<string> {
        return this.db.create(income);
    }

    public async update(id:string, income: Income): Promise<void> {
        return this.db.update(id, income);
    }

    public async remove(id: string): Promise<void> {
        return this.db.remove(id);
    }

    public async getAll(): Promise<Incomes> {
        return this.db.get();
    }

    public async get(id:string): Promise<Income> {
        return this.db.getById(id);
    }
}