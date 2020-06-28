import { Money, Currency } from "ts-money";
import { AuthService } from "../auth/services/auth.service";

export class MoskaAccount {
    currentBalance: Money;
    name: string;
    currency: string;
    userId: string;

    constructor(currentBalance: Money, name: string, currency: string, userId: string) {
        this.currentBalance = currentBalance;
        this.name = name;
        this.currency = currency;
        this.userId = userId;
    }

    public static fromApiRequest(request: any, userId: string) {
        const balance = new Money(request.balance, request.currency);
        const name = request.name;
        return new MoskaAccount(balance,name, balance.currency ,userId);
    }
}

export interface MoskaAccounts {
    [key:string]: MoskaAccount;
}