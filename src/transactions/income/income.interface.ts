import { Record } from "../record.interface";
import { MoskaAccount } from "../../account/moskaAccount.model";

export interface Income extends Record {
    account: MoskaAccount;
}