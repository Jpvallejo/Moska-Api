import { Record } from '../record.interface';
import { Money } from 'ts-money';

export class Expense implements Record {
    amount: Money;
    description: string;
    date: Date;
    accountId: string;

    constructor(amount: Money, description: string, date: Date, accountId: string) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.accountId = accountId;
    }

    public static fromApiResponse(response: any): Expense {
        const amount = Money.fromDecimal(response.amount, response.currency);
        const description = response.description;
        const date = new Date(Date.parse(response.date));
        const accountId = response.accountId;
        return new Expense(amount, description, date, accountId);
    }
}