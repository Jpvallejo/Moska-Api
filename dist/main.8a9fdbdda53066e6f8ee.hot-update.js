exports.id = "main";
exports.modules = {

/***/ "./src/auth/services/jwt.service.ts":
/*!******************************************!*\
  !*** ./src/auth/services/jwt.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nfunction encodeSession(secretKey, partialSession) {\n    console.log('hola 1');\n    // Determine when the token should expire\n    var issued = Date.now();\n    var fifteenMinutesInMs = 15 * 60 * 1000;\n    var expires = issued + fifteenMinutesInMs;\n    var session = __assign(__assign({}, partialSession), { issued: issued, expires: expires });\n    console.log('hola 3');\n    var encodedToken = jsonwebtoken_1.default.sign(session, secretKey, { expiresIn: expires });\n    console.log('hola 4');\n    return {\n        token: encodedToken,\n        issued: issued,\n        expires: expires\n    };\n}\nexports.encodeSession = encodeSession;\nfunction decodeSession(secretKey, sessionToken) {\n    console.log('holaaa');\n    var result;\n    try {\n        result = jsonwebtoken_1.default.verify(sessionToken, secretKey);\n    }\n    catch (_e) {\n        var e = _e;\n        // These error strings can be found here:\n        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js\n        if (e.message === \"No token supplied\" || e.message === \"Not enough or too many segments\") {\n            return {\n                type: \"invalid-token\"\n            };\n        }\n        if (e.message === \"Signature verification failed\" || e.message === \"Algorithm not supported\") {\n            return {\n                type: \"integrity-error\"\n            };\n        }\n        // Handle json parse errors, thrown when the payload is nonsense\n        if (e.message.indexOf(\"Unexpected token\") === 0) {\n            return {\n                type: \"invalid-token\"\n            };\n        }\n        throw e;\n    }\n    return {\n        type: \"valid\",\n        session: result\n    };\n}\nexports.decodeSession = decodeSession;\nfunction checkExpirationStatus(token) {\n    var now = Date.now();\n    if (token.expires > now)\n        return \"active\";\n    // Find the timestamp for the end of the token's grace period\n    var threeHoursInMs = 3 * 60 * 60 * 1000;\n    var threeHoursAfterExpiration = token.expires + threeHoursInMs;\n    if (threeHoursAfterExpiration > now)\n        return \"grace\";\n    return \"expired\";\n}\nexports.checkExpirationStatus = checkExpirationStatus;\n\n\n//# sourceURL=webpack:///./src/auth/services/jwt.service.ts?");

/***/ })

};