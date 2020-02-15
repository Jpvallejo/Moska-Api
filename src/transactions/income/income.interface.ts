import { Record } from "../record.interface";
import { MoskaAccount } from "../../account/moskaAccount.interface";

export interface Income extends Record {
    account: MoskaAccount;
}