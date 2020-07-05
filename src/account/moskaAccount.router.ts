/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { AccountService } from "./moskaAccount.service";
import { MoskaAccounts, MoskaAccount } from "./moskaAccount.model";
import { AuthService } from "../auth/services/auth.service";


/**
 * Router Definition
 */
export const accountsRouter = express.Router();

/**
 *  Service Definition
 */
const accountsService = new AccountService();
const authService = new AuthService();

/**
 * Controller Definitions
 */

// GET 

accountsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const authHeader = req.header('X-JWT-Token');
        const authToken: string =  authHeader ? authHeader : '' ;
        const userId = await authService.getUserIdFromToken(authToken);
        const accounts = await accountsService.getByUser(userId);

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

accountsRouter.get("/byUser/:userId", async (req: Request, res: Response) => {
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
        const authHeader = req.header('X-JWT-Token');
        const authToken: string =  authHeader ? authHeader : '' ;
        const userId = await authService.getUserIdFromToken(authToken);
        const account: MoskaAccount = MoskaAccount.fromApiRequest(req.body, userId);

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