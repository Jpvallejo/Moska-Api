exports.id = "main";
exports.modules = {

/***/ "./src/account/moskaAccount.router.ts":
/*!********************************************!*\
  !*** ./src/account/moskaAccount.router.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules and Interfaces\n */\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar moskaAccount_service_1 = __webpack_require__(/*! ./moskaAccount.service */ \"./src/account/moskaAccount.service.ts\");\n/**\n * Router Definition\n */\nexports.accountsRouter = express_1.default.Router();\n/**\n *  Service Definition\n */\nvar accountsService = new moskaAccount_service_1.AccountService();\n/**\n * Controller Definitions\n */\n// GET \nexports.accountsRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var accounts, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.getAll()];\n            case 1:\n                accounts = _a.sent();\n                res.status(200).send(accounts);\n                return [3 /*break*/, 3];\n            case 2:\n                e_1 = _a.sent();\n                res.status(404).send(e_1.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET :id\nexports.accountsRouter.get(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.get(req.params.id)];\n            case 1:\n                account = _a.sent();\n                res.status(200).send(account);\n                return [3 /*break*/, 3];\n            case 2:\n                e_2 = _a.sent();\n                res.status(404).send(e_2.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET :userId\nexports.accountsRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var accounts, e_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.getByUser(req.query.userId)];\n            case 1:\n                accounts = _a.sent();\n                res.status(200).send(accounts);\n                return [3 /*break*/, 3];\n            case 2:\n                e_3 = _a.sent();\n                res.status(404).send(e_3.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// POST \nexports.accountsRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                account = req.body;\n                return [4 /*yield*/, accountsService.create(account).then(function (id) {\n                        res.sendStatus(201).send(id);\n                    })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_4 = _a.sent();\n                res.status(404).send(e_4.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT \nexports.accountsRouter.put(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                account = req.body.account;\n                return [4 /*yield*/, accountsService.update(req.params.id, account)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_5 = _a.sent();\n                res.status(500).send(e_5.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE\nexports.accountsRouter.delete(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var e_6;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.remove(req.params.id)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_6 = _a.sent();\n                res.status(500).send(e_6.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/account/moskaAccount.router.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules\n */\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar firebase_admin_1 = __importDefault(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\nvar serviceAccount = __importStar(__webpack_require__(/*! ../serviceAccount.json */ \"./serviceAccount.json\"));\nfirebase_admin_1.default.initializeApp({\n    credential: firebase_admin_1.default.credential.cert({\n        privateKey: serviceAccount.private_key,\n        projectId: serviceAccount.project_id,\n        clientEmail: serviceAccount.client_email\n    }),\n    databaseURL: 'https://moska-fbb04.firebaseio.com/'\n});\nvar error_middleware_1 = __webpack_require__(/*! ./middleware/error.middleware */ \"./src/middleware/error.middleware.ts\");\nvar notFound_middleware_1 = __webpack_require__(/*! ./middleware/notFound.middleware */ \"./src/middleware/notFound.middleware.ts\");\nvar expenses_router_1 = __webpack_require__(/*! ./transactions/expense/expenses.router */ \"./src/transactions/expense/expenses.router.ts\");\nvar incomes_router_1 = __webpack_require__(/*! ./transactions/income/incomes.router */ \"./src/transactions/income/incomes.router.ts\");\nvar spendings_router_1 = __webpack_require__(/*! ./credit-card/cc-spending/spendings.router */ \"./src/credit-card/cc-spending/spendings.router.ts\");\nvar moskaAccount_router_1 = __webpack_require__(/*! ./account/moskaAccount.router */ \"./src/account/moskaAccount.router.ts\");\ndotenv.config();\n/**\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT, 10);\nvar app = express_1.default();\n/**\n *  App Configuration\n */\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(express_1.default.json());\napp.use(\"/expenses\", expenses_router_1.expensesRouter);\napp.use(\"/incomes\", incomes_router_1.incomesRouter);\napp.use(\"/ccSpendings\", spendings_router_1.ccSpendingsRouter);\napp.use(\"/accounts\", moskaAccount_router_1.accountsRouter);\napp.use(error_middleware_1.errorHandler);\napp.use(notFound_middleware_1.notFoundHandler);\n/**\n * Server Activation\n */\nvar server = app.listen(PORT, function () {\n    console.log(\"Listening on port \" + PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

};