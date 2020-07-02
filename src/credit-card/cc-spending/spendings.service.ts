import { CreditCardSpending } from "./cc-spending.model";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpendingsDatabase } from "./spendings.database";
import { addMonth } from "ts-date";
import { Money } from "ts-money";
import _ from "lodash";

export class CreditCardSpendingsService {
    private db = new CreditCardSpendingsDatabase();

    public async create(record: CreditCardSpending): Promise<string> {
        return this.db.create(record);
    }

    public async createWithPayments(record: any, payments: number) {
        const spending = CreditCardSpending.fromApiResponse(record);
        const rawDescription = spending.description
        const initialDate = spending.date;
        const amount = spending.amount.divide(payments);
        for(let i = 0; i < payments; i++){
            spending.date = addMonth(initialDate, i);
            spending.amount = amount;
            spending.description = rawDescription + ` (${i+1}/${payments})`;
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
    
    public async getByAccount(accountId:string, month:number, year:number): Promise<any> {
        let map: any = {};
        await this.db.getByAccount(accountId, month, year).then((spendings) => {
            _.map(spendings, (spending, key) => {
                map[key] =
                    {
                        "amount": spending.amount.toDecimal(),
                        "description": spending.description,
                        "date": spending.date,
                        "creditCardId": spending.creditCardId,
                        "currency": spending.amount.currency
                    };
        })
    });
        return map;
    }
}