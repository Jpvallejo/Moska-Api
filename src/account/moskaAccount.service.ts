import { MoskaAccount, MoskaAccounts } from "./moskaAccount.interface";
import { AccountDatabase } from "./moskaAccount.database";

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

    public async getByUser(userId: string): Promise<MoskaAccounts> {
        return this.db.getByUser(userId);
    }
}