exports.id = "main";
exports.modules = {

/***/ "./src/credit-card/cc-spending/spendings.service.ts":
/*!**********************************************************!*\
  !*** ./src/credit-card/cc-spending/spendings.service.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar spendings_database_1 = __webpack_require__(/*! ./spendings.database */ \"./src/credit-card/cc-spending/spendings.database.ts\");\nvar ts_date_1 = __webpack_require__(/*! ts-date */ \"ts-date\");\nvar CreditCardSpendingsService = /** @class */ (function () {\n    function CreditCardSpendingsService() {\n        this.db = new spendings_database_1.CreditCardSpendingsDatabase();\n    }\n    CreditCardSpendingsService.prototype.create = function (record) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.create(record)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.createWithPayments = function (record, payments) {\n        return __awaiter(this, void 0, void 0, function () {\n            var spending, amount, i;\n            return __generator(this, function (_a) {\n                spending = record;\n                amount = record.amount;\n                console.log(amount);\n                amount = amount.divide(payments);\n                for (i = 0; i < payments; i++) {\n                    spending.date = ts_date_1.addMonth(record.date, record.date.getMonth() + i);\n                    spending.amount = amount;\n                    this.db.create(spending);\n                }\n                return [2 /*return*/];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.update = function (id, record) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.update(id, record)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.remove(id)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.getAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.get()];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.get = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getById(id)];\n            });\n        });\n    };\n    return CreditCardSpendingsService;\n}());\nexports.CreditCardSpendingsService = CreditCardSpendingsService;\n\n\n//# sourceURL=webpack:///./src/credit-card/cc-spending/spendings.service.ts?");

/***/ })

};