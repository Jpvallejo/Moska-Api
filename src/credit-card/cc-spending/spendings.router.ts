/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { CreditCardSpendings } from "./cc-spendings.interface";
import { CreditCardSpending } from "./cc-spending.interface";
import { CreditCardSpendingsService } from "./spendings.service";

/**
 * Router Definition
 */
export const ccSpendingsRouter = express.Router();

/**
 *  Service Definition
 */
const ccSpendingsService = new CreditCardSpendingsService();

/**
 * Controller Definitions
 */

// GET expenses/

ccSpendingsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const expenses: CreditCardSpendings = await ccSpendingsService.getAll();

        res.status(200).send(expenses);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET expenses/:id

ccSpendingsRouter.get("/:id", async (req: Request, res: Response) => {

    try {
        const expense: CreditCardSpending = await ccSpendingsService.get(req.params.id);

        res.status(200).send(expense);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET expenses/:accountId

// expensesRouter.get("/:accountId", async (req: Request, res: Response) => {
//     const accountId = parseInt(req.params.accountId, 10);
//     try {
//         const expenses: Expenses = await expensesService.findByAccount(accountId);

//         res.status(200).send(expenses);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// POST expenses/

ccSpendingsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const expense: CreditCardSpending = req.body;

        await ccSpendingsService.create(expense).then( (id) => {
            res.sendStatus(201).send(id);
        });

    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT expenses/

ccSpendingsRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const expense: CreditCardSpending = req.body.expense;

        await ccSpendingsService.update(req.params.id,expense);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE expenses/:id

ccSpendingsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await ccSpendingsService.remove(req.params.id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});