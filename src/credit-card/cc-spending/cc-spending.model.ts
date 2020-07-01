import { Record } from "../../transactions/record.interface";
import { CreditCard } from "../credit-card.model";
import { Money } from "ts-money";

export class CreditCardSpending implements Record {
    public amount: Money;
    public description: string;
    public date: Date;
    public creditCardId: string;

    constructor(amount: Money, description: string, date: Date, creditCardId: string) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.creditCardId = creditCardId;
    }

    public static fromApiResponse(response: any): CreditCardSpending {
        const amount = new Money(response.amount, response.currency);
        const description = response.description;
        const date = new Date(response.date);
        const creditCardId = response.creditCardId;
        return new CreditCardSpending(amount, description, date, creditCardId);
    }


}