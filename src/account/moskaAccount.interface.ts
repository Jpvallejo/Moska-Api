import { Money, Currency } from "ts-money";

export interface MoskaAccount {
    id: number;
    currentBalance: Money;
    name: string;
    currency: Currency;
    userId: string;
}

export interface MoskaAccounts {
    [key:string]: MoskaAccount;
}