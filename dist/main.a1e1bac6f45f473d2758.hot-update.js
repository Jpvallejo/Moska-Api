exports.id = "main";
exports.modules = {

/***/ "./src/auth/services/users.service.ts":
/*!********************************************!*\
  !*** ./src/auth/services/users.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar user_database_1 = __webpack_require__(/*! ../user.database */ \"./src/auth/user.database.ts\");\nvar uuid_1 = __webpack_require__(/*! uuid */ \"uuid\");\nvar UsersService = /** @class */ (function () {\n    function UsersService() {\n        this.db = new user_database_1.UserDatabase();\n    }\n    UsersService.prototype.create = function (partialUser) {\n        return __awaiter(this, void 0, void 0, function () {\n            var user;\n            return __generator(this, function (_a) {\n                user = __assign(__assign({}, partialUser), { id: uuid_1.v4() });\n                this.db.create(user);\n                return [2 /*return*/, user.id];\n            });\n        });\n    };\n    UsersService.prototype.getUser = function (user) {\n        return __awaiter(this, void 0, void 0, function () {\n            var userId, newId;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        console.log('hola 3');\n                        return [4 /*yield*/, this.db.getUserId(user)];\n                    case 1:\n                        userId = _a.sent();\n                        if (!!userId) return [3 /*break*/, 3];\n                        console.log('hola 4');\n                        return [4 /*yield*/, this.create(user)];\n                    case 2:\n                        newId = _a.sent();\n                        return [2 /*return*/, this.db.getById(newId)];\n                    case 3: return [2 /*return*/, this.db.getById(userId)];\n                }\n            });\n        });\n    };\n    return UsersService;\n}());\nexports.UsersService = UsersService;\n\n\n//# sourceURL=webpack:///./src/auth/services/users.service.ts?");

/***/ }),

/***/ "./src/auth/user.database.ts":
/*!***********************************!*\
  !*** ./src/auth/user.database.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_service_1 = __importDefault(__webpack_require__(/*! ../services/firebase-service */ \"./src/services/firebase-service.ts\"));\nvar UserDatabase = /** @class */ (function () {\n    function UserDatabase() {\n        var _this = this;\n        this.db = firebase_service_1.default.database();\n        this.usersRef = this.db.ref(\"server/saving-data/users\");\n        this.usersRef.on('value', function (snap) {\n            _this.users = snap && snap.val(); // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    UserDatabase.prototype.create = function (user) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.usersRef.push(user).toString()];\n            });\n        });\n    };\n    UserDatabase.prototype.getUserId = function (requested) {\n        return __awaiter(this, void 0, void 0, function () {\n            var findFunction;\n            return __generator(this, function (_a) {\n                console.log('hola 6');\n                findFunction = function (key) {\n                    var actualUser = this.users[key];\n                    return actualUser.email === requested.email;\n                    // this.users[key].email === requested.email &&\n                    // this.users[key].firstName === requested.firstName &&\n                    // this.users[key].email === requested.lastName\n                };\n                return [2 /*return*/, Object.keys(this.users).find(findFunction)];\n            });\n        });\n    };\n    UserDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                console.log('hola 5');\n                return [2 /*return*/, this.users[id]];\n            });\n        });\n    };\n    return UserDatabase;\n}());\nexports.UserDatabase = UserDatabase;\n\n\n//# sourceURL=webpack:///./src/auth/user.database.ts?");

/***/ })

};