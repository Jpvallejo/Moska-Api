import { MoskaAccount } from "../../account/moskaAccount.interface";
import { Record } from '../record.interface';

export interface Expense extends Record {
    accountId: number;
}