import { Expense } from './expense.model';
import { Expenses } from './expenses.interface';
import { ExpensesDatabase } from './expenses.database';
import _ from 'lodash';

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

    public async getByAccount(accountId:string, month:number, year:number): Promise<any> {
        let map: any = {};
        await this.db.getByAccount(accountId, month, year).then((expenses) => {
            _.map(expenses, (spending, key) => {
                map[key] =
                    {
                        "amount": spending.amount.toDecimal(),
                        "description": spending.description,
                        "date": spending.date,
                        "accountId": spending.accountId,
                        "currency": spending.amount.currency
                    };
        })
    });
        return map;
    }
}
