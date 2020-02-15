import { Money } from "ts-money";
import { MoskaAccount } from "../account/moskaAccount.interface";

export interface CreditCard {
    id: number;
    user: string;
    hasLimit: boolean;
    limit? : Money;
    account: MoskaAccount;
    closingDay: number;
    paymentDay: number;
}