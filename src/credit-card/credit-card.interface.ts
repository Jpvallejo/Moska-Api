import { Money } from "ts-money";

export interface CreditCard {
    id: string;
    user: string;
    hasLimit: boolean;
    limit? : Money;
    accountId: string;
    closingDay: number;
    paymentDay: number;
}