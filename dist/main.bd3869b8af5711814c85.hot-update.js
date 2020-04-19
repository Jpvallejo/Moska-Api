exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules\n */\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar auth_middleware_1 = __webpack_require__(/*! ./middleware/auth.middleware */ \"./src/middleware/auth.middleware.ts\");\nvar error_middleware_1 = __webpack_require__(/*! ./middleware/error.middleware */ \"./src/middleware/error.middleware.ts\");\nvar notFound_middleware_1 = __webpack_require__(/*! ./middleware/notFound.middleware */ \"./src/middleware/notFound.middleware.ts\");\nvar expenses_router_1 = __webpack_require__(/*! ./transactions/expense/expenses.router */ \"./src/transactions/expense/expenses.router.ts\");\nvar incomes_router_1 = __webpack_require__(/*! ./transactions/income/incomes.router */ \"./src/transactions/income/incomes.router.ts\");\nvar spendings_router_1 = __webpack_require__(/*! ./credit-card/cc-spending/spendings.router */ \"./src/credit-card/cc-spending/spendings.router.ts\");\nvar moskaAccount_router_1 = __webpack_require__(/*! ./account/moskaAccount.router */ \"./src/account/moskaAccount.router.ts\");\nvar auth_router_1 = __webpack_require__(/*! ./auth/auth.router */ \"./src/auth/auth.router.ts\");\ndotenv.config();\n/**\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT, 10);\nvar app = express_1.default();\n/**\n *  App Configuration\n */\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(express_1.default.json());\napp.use(\"/expenses\", expenses_router_1.expensesRouter);\napp.use(\"/incomes\", incomes_router_1.incomesRouter);\napp.use(\"/ccSpendings\", spendings_router_1.ccSpendingsRouter);\napp.use(\"/accounts\", moskaAccount_router_1.accountsRouter);\napp.use(auth_middleware_1.requireJwtMiddleware);\napp.use(\"/auth\", auth_router_1.authRouter);\napp.use(error_middleware_1.errorHandler);\napp.use(notFound_middleware_1.notFoundHandler);\n/**\n * Server Activation\n */\nvar server = app.listen(PORT, function () {\n    console.log(\"Listening on port \" + PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/middleware/auth.middleware.ts":
/*!*******************************************!*\
  !*** ./src/middleware/auth.middleware.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jwt_service_1 = __webpack_require__(/*! ../auth/services/jwt.service */ \"./src/auth/services/jwt.service.ts\");\n/**\n * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.\n */\nvar jwtKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';\nfunction requireJwtMiddleware(request, response, next) {\n    console.log('holis');\n    var unauthorized = function (message) { return response.status(401).json({\n        ok: false,\n        status: 401,\n        message: message\n    }); };\n    var requestHeader = \"X-JWT-Token\";\n    var responseHeader = \"X-Renewed-JWT-Token\";\n    var header = request.header(requestHeader);\n    if (!header) {\n        console.log('llega aca');\n        response.send(unauthorized(\"Required \" + requestHeader + \" header not found.\"));\n        return;\n    }\n    var decodedSession = jwt_service_1.decodeSession(jwtKey, header);\n    if (decodedSession.type === \"integrity-error\" || decodedSession.type === \"invalid-token\") {\n        return next(unauthorized(\"Failed to decode or validate authorization token. Reason: \" + decodedSession.type + \".\"));\n        return;\n    }\n    var expiration = jwt_service_1.checkExpirationStatus(decodedSession.session);\n    if (expiration === \"expired\") {\n        unauthorized(\"Authorization token has expired. Please create a new authorization token.\");\n        return;\n    }\n    var session;\n    if (expiration === \"grace\") {\n        // Automatically renew the session and send it back with the response\n        var _a = jwt_service_1.encodeSession(jwtKey, decodedSession.session), token = _a.token, expires = _a.expires, issued = _a.issued;\n        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });\n        response.setHeader(responseHeader, token);\n    }\n    else {\n        session = decodedSession.session;\n    }\n    // Set the session on response.locals object for routes to access\n    response.locals = __assign(__assign({}, response.locals), { session: session });\n    // Request has a valid or renewed session. Call next to continue to the authenticated route handler\n    next();\n}\nexports.requireJwtMiddleware = requireJwtMiddleware;\n\n\n//# sourceURL=webpack:///./src/middleware/auth.middleware.ts?");

/***/ })

};