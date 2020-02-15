import { Expense } from "./expense.interface";

export interface Expenses {
    [key: number]: Expense;
}