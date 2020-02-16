import { Money } from "ts-money";
import { MoskaAccount } from "../account/moskaAccount.interface";

export interface CreditCard {
    id: string;
    user: string;
    hasLimit: boolean;
    limit? : Money;
    accountId: string;
    closingDay: number;
    paymentDay: number;
}