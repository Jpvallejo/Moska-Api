/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { Expenses } from "./expenses.interface";
import { Expense } from "./expense.interface";
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

// expensesRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const expenses: Expenses = await expensesService.findAll();

//         res.status(200).send(expenses);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// // GET expenses/:id

// expensesRouter.get("/:id", async (req: Request, res: Response) => {
//     const id: number = parseInt(req.params.id, 10);

//     try {
//         const expense: Expense = await expensesService.find(id);

//         res.status(200).send(expense);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

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

        await expensesService.create(expense);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT expenses/

// expensesRouter.put("/", async (req: Request, res: Response) => {
//     try {
//         const expense: Expense = req.body.expense;

//         await expensesService.update(expense);

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// DELETE expenses/:id

expensesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await expensesService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});