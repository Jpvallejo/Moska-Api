import { Income } from "./income.model";
import { Incomes } from "./incomes.interface";
import { IncomesDatabase } from "./incomes.database";
import _ from "lodash";

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

    public async getByAccount(accountId:string, month:number, year:number): Promise<any> {
        let map: any = {};
        await this.db.getByAccount(accountId, month, year).then((incomes) => {
            _.map(incomes, (spending, key) => {
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

    public async get(id:string): Promise<Income> {
        return this.db.getById(id);
    }
}