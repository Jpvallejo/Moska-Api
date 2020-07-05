/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { Expenses } from "./expenses.interface";
import { Expense } from "./expense.model";
import { ExpensesService } from "./expenses.service";

/**
 * Router Definition
 */
export const expensesRouter = express.Router();

/**
 *  Service Definition
 */
const expensesService = new ExpensesService();

/**
 * Controller Definitions
 */

// GET expenses/

expensesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const expenses: Expenses = await expensesService.getAll();

        res.status(200).send(expenses);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET expenses/:id

expensesRouter.get("/:id", async (req: Request, res: Response) => {

    try {
        const expense: Expense = await expensesService.get(req.params.id);

        res.status(200).send(expense);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET expenses/:accountId

expensesRouter.get("/byAccount/:accountId", async (req: Request, res: Response) => {
    try {
      const records = await expensesService.getByAccount(
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

// // GET expenses/:userId

// expensesRouter.get("/:userId", async (req: Request, res: Response) => {
//     const userId = parseInt(req.params.userId, 10);
//     try {
//         const expenses: Expenses = await expensesService.findByAccount(userId);

//         res.status(200).send(expenses);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// POST expenses/

expensesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const expense: Expense = req.body;

        await expensesService.create(expense).then( (id) => {
            res.sendStatus(201).send(id);
        });

    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT expenses/

expensesRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const expense: Expense = req.body.expense;

        await expensesService.update(req.params.id,expense);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE expenses/:id

expensesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await expensesService.remove(req.params.id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});