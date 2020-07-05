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
        const balance = Money.fromDecimal(request.currentBalance, request.currency);
        const name = request.name;
        return new MoskaAccount(balance,name, balance.currency ,userId);
    }

    public static fromApiResponse(request: any) {
        const balance = Money.fromDecimal(request.currentBalance, request.currency);
        const name = request.name;
        const userId = request.userId;
        return new MoskaAccount(balance,name, balance.currency ,userId);
    }
}

export interface MoskaAccounts {
    [key:string]: MoskaAccount;
}