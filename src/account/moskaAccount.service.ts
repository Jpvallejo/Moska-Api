import { AccountDatabase } from "./moskaAccount.database";
import { MoskaAccount, MoskaAccounts } from "./moskaAccount.model";
import _ from "lodash";

export class AccountService {
    private db = new AccountDatabase();

    public async create(account: MoskaAccount): Promise<string> {
        return this.db.create(account);
    }

    public async update(id:string, account: MoskaAccount): Promise<void> {
        return this.db.update(id, account);
    }

    public async remove(id: string): Promise<void> {
        return this.db.remove(id);
    }

    public async getAll(): Promise<MoskaAccounts> {
        return this.db.get();
    }

    public async get(id:string): Promise<MoskaAccount> {
        return this.db.getById(id);
    }

    public async getByUser(userId: string): Promise<any> {
        let map: any = {};
        await this.db.getByUser(userId).then((accounts) => {
            _.map(accounts, (account, key) => {
                map[key] =
                    {
                        "currentBalance": account.currentBalance.toDecimal(),
                        "name": account.name,
                        "userId": account.userId,
                        "currency": account.currentBalance.currency
                    };
        })
        });
        return map;
    }
}