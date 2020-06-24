/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { CreditCardService } from "./credit-card.service";
import { AuthService } from "../auth/services/auth.service";
import { CreditCards, CreditCard } from "./credit-card.model";


/**
 * Router Definition
 */
export const ccAccountsRouter = express.Router();

/**
 *  Service Definition
 */
const accountsService = new CreditCardService();
const authService = new AuthService();

/**
 * Controller Definitions
 */

// GET 

ccAccountsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const accounts: CreditCards = await accountsService.getAll();

        res.status(200).send(accounts);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET :id

ccAccountsRouter.get("/:id", async (req: Request, res: Response) => {

    try {
        const account: CreditCard = await accountsService.get(req.params.id);

        res.status(200).send(account);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // GET :userId

ccAccountsRouter.get("/byUser/:userId", async (req: Request, res: Response) => {
    try {
        const accounts: CreditCards = await accountsService.getByUser(req.params.userId);

        res.status(200).send(accounts);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST 

ccAccountsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const authHeader = req.header('X-JWT-Token');
        const authToken: string =  authHeader ? authHeader : '' ;
        const userId = await authService.getUserIdFromToken(authToken);
        const account: CreditCard = CreditCard.fromApiRequest(req.body, userId);

        await accountsService.create(account).then( (id) => {
            res.sendStatus(201).send(id);
        });

    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT 

ccAccountsRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const account: CreditCard = req.body.account;

        await accountsService.update(req.params.id,account);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE

ccAccountsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await accountsService.remove(req.params.id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});