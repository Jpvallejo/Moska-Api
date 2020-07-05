import { IncomesService } from "./incomes.service";
import express, {Request, Response} from "express";
import { Income } from "./income.model";
import { Incomes } from "./incomes.interface"
import { AccountService } from "../../account/moskaAccount.service";

/**
 * Router Definition
 */
export const incomesRouter = express.Router();
const incomesService = new IncomesService();
const accountService = new AccountService();
/**
 * Controller Definitions
 */

// GET Incomes/

incomesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const incomes: Incomes = await incomesService.getAll();

        res.status(200).send(incomes);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET Incomes/:id

incomesRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const income: Income = await incomesService.get(req.params.id);

        res.status(200).send(income);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET incomes/:accountId

incomesRouter.get("/byAccount/:accountId", async (req: Request, res: Response) => {
    try {
      const records = await incomesService.getByAccount(
        req.params.accountId,
        req.query.month,
        req.query.year
      );
      console.log(JSON.stringify(records));
      res.status(200).send(records);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST Incomes/

incomesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const income: Income = Income.fromApiResponse(req.body);

        await incomesService.create(income).then( async (id) => {
            await accountService.updateBalance(income.accountId, income.amount, "add");
            res.sendStatus(201).send(id);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT Incomes/

incomesRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const income: Income = req.body;

        await incomesService.update(req.params.id ,income);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE Incomes/:id

incomesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await incomesService.get(req.params.id).then(async (income) => {
            await incomesService.remove(req.params.id).then( async (id) => {
                await accountService.updateBalance(income.accountId, income.amount, "add");
                res.sendStatus(201).send(id);
            });;
        });

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});