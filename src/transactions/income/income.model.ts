import { Record } from "../record.interface";
import { MoskaAccount } from "../../account/moskaAccount.model";
import { Money } from "ts-money";

export class Income implements Record {
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

    public static fromApiResponse(response: any): Income {
        const amount = Money.fromDecimal(response.amount, response.currency);
        const description = response.description;
        const date = new Date(Date.parse(response.date));
        const accountId = response.accountId;
        return new Income(amount, description, date, accountId);
    }
}