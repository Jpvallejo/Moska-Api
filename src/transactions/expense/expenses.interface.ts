import { Expense } from "./expense.model";

export interface Expenses {
    [key: string]: Expense;
}