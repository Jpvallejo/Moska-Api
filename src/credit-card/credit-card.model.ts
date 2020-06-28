import { Money } from "ts-money";

export class CreditCard {
    user: string;
    name: string;
    hasLimit: boolean;
    limit? : Money;
    closingDay: number;
    paymentDay: number;

    constructor(
        user: string,
        name: string,
        hasLimit: boolean,
        closingDay: number,
        paymentDay: number,
        limit? : Money
    ) {
        this.user = user;
        this.name = name;
        this.hasLimit = hasLimit;
        this.closingDay = closingDay;
        this.paymentDay = paymentDay;
        this.limit = limit;
    }

    public static fromApiRequest(response: any, userId: string) {
        const closingDay = response.closingDay;
        const paymentDay = response.paymentDay;
        const hasLimit = response.hasLimit;
        if(hasLimit) {
            const limit = new Money(response.limitAmount, response.currency);
            return new CreditCard(userId, name, hasLimit, closingDay, paymentDay, limit);
        }
        return new CreditCard(userId, name, hasLimit, closingDay, paymentDay);
    }
}

export interface CreditCards {
    [key:string]: CreditCard;
}