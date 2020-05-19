import { Record } from '../record.interface';

export interface Expense extends Record {
    accountId: number;
}