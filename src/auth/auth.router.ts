import express, { Request, Response } from "express";
import { encodeSession } from "./services/jwt.service";
import { AuthService } from "./services/auth.service";

const authService = new AuthService();
/**
 * Router Definition
 */
export const authRouter = express.Router();
/**
 * Controller Definitions
 */

authRouter.post("/", async (req: Request, res: Response) => {
    try {
        const requestedUser = {
            email: req.body['email'],
            firstName: req.body['firstName'],
            lastName: req.body['lastName']
        }
        const user = await authService.getUser(requestedUser);
        const jwtToken = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';
        const session = encodeSession(jwtToken, {
            ...user,
            dateCreated: Date.now(),
        });
        res.status(201).json(session);
    }
    catch (err) {
        console.log(err.message);
        res.status(400);
    }
});