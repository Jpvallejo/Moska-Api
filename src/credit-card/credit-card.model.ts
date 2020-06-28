import { Money } from "ts-money";

export class CreditCard {
    user: string;
    hasLimit: boolean;
    limit? : Money;
    closingDay: number;
    paymentDay: number;

    constructor(
        user: string,
        hasLimit: boolean,
        closingDay: number,
        paymentDay: number,
        limit? : Money
    ) {
        this.user = user;
        this.hasLimit = hasLimit;
        this.closingDay = closingDay;
        this.paymentDay = paymentDay;
        this.limit = limit;
    }

    public static fromApiRequest(response: any, userId: string) {
        const closingDay = response.closingDay;
        const paymentDay = response.paymentDay;
        const hasLimit = response.hasLimit;
        let limit;
        if(hasLimit) {
            limit = new Money(response.limitAmount, response.currency);
        }
        return new CreditCard(userId, hasLimit, closingDay, paymentDay, limit);
    }
}

export interface CreditCards {
    [key:string]: CreditCard;
}