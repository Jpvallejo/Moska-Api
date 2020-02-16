import { IncomesService } from "./incomes.service";
import express, {Request, Response} from "express";
import { Income } from "./income.interface";
import { Incomes } from "./incomes.interface"

/**
 * Router Definition
 */
export const incomesRouter = express.Router();
const incomesService = new IncomesService
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

// POST Incomes/

incomesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const income: Income = req.body;

        await incomesService.create(income);

        res.sendStatus(201);
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
        await incomesService.remove(req.params.id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});