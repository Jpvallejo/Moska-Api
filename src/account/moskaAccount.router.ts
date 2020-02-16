/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { AccountService } from "./moskaAccount.service";
import { MoskaAccount, MoskaAccounts } from "./moskaAccount.interface";

/**
 * Router Definition
 */
export const accountsRouter = express.Router();

/**
 *  Service Definition
 */
const accountsService = new AccountService();

/**
 * Controller Definitions
 */

// GET 

accountsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const accounts: MoskaAccounts = await accountsService.getAll();

        res.status(200).send(accounts);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET :id

accountsRouter.get("/:id", async (req: Request, res: Response) => {

    try {
        const account: MoskaAccount = await accountsService.get(req.params.id);

        res.status(200).send(account);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET :userId

accountsRouter.get("/:userId", async (req: Request, res: Response) => {
    try {
        const accounts: MoskaAccounts = await accountsService.getByUser(req.params.userId);

        res.status(200).send(accounts);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST 

accountsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const account: MoskaAccount = req.body;

        await accountsService.create(account).then( (id) => {
            res.sendStatus(201).send(id);
        });

    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT 

accountsRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const account: MoskaAccount = req.body.account;

        await accountsService.update(req.params.id,account);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE

accountsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await accountsService.remove(req.params.id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});