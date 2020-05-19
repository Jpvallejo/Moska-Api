import { Money } from "ts-money";

export interface Record {
    amount: Money;
    description: string;
    date: Date;
}