import { Record } from "../../transactions/record.interface";
import { CreditCard } from "../credit-card.interface";

export interface CreditCardSpending extends Record {
    creditCard: CreditCard;
}