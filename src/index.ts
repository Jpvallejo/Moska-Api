/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import firebase from "firebase-admin";
import * as serviceAccount from "../serviceAccount.json";
firebase.initializeApp({
    credential: firebase.credential.cert({
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email
    }),
    databaseURL: 'https://moska-fbb04.firebaseio.com/'
})
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { expensesRouter } from "./transactions/expense/expenses.router";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);
app.use("/expenses", expensesRouter)

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
        dependencies: string[],
        callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}