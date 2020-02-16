import { Expense } from './expense.interface';
import { Expenses } from './expenses.interface';
import { ExpensesDatabase } from './expenses.database';

export class ExpensesService {
    private db = new ExpensesDatabase();

    public async create(expense: Expense): Promise<string> {
        return this.db.create(expense);
    }

    public async update(id:string, expense: Expense): Promise<void> {
        return this.db.update(id, expense);
    }

    public async remove(id: string): Promise<void> {
        return this.db.remove(id);
    }

    public async getAll(): Promise<Expenses> {
        return this.db.get();
    }

    public async get(id:string): Promise<Expense> {
        return this.db.getById(id);
    }
}
