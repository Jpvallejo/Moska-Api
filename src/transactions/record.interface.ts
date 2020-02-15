import { Money } from "ts-money";

export interface Record {
    id: number;
    amount: Money;
    description: string;
    date: Date;
}