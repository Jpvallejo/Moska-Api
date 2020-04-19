exports.id = "main";
exports.modules = {

/***/ "./src/auth/services/jwt.service.ts":
/*!******************************************!*\
  !*** ./src/auth/services/jwt.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jwt_simple_1 = __webpack_require__(/*! jwt-simple */ \"jwt-simple\");\nfunction encodeSession(secretKey, partialSession) {\n    console.log('hola 1');\n    // Always use HS512 to sign the token\n    var algorithm = \"HS256\";\n    // Determine when the token should expire\n    var issued = Date.now();\n    var fifteenMinutesInMs = 15 * 60 * 1000;\n    var expires = issued + fifteenMinutesInMs;\n    var session = __assign(__assign({}, partialSession), { issued: issued, expires: expires });\n    return {\n        token: jwt_simple_1.encode(session, secretKey, algorithm),\n        issued: issued,\n        expires: expires\n    };\n}\nexports.encodeSession = encodeSession;\nfunction decodeSession(secretKey, sessionToken) {\n    // Always use HS512 to decode the token\n    var algorithm = \"HS256\";\n    var result;\n    try {\n        result = jwt_simple_1.decode(sessionToken, secretKey, false, algorithm);\n    }\n    catch (_e) {\n        var e = _e;\n        // These error strings can be found here:\n        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js\n        if (e.message === \"No token supplied\" || e.message === \"Not enough or too many segments\") {\n            return {\n                type: \"invalid-token\"\n            };\n        }\n        if (e.message === \"Signature verification failed\" || e.message === \"Algorithm not supported\") {\n            return {\n                type: \"integrity-error\"\n            };\n        }\n        // Handle json parse errors, thrown when the payload is nonsense\n        if (e.message.indexOf(\"Unexpected token\") === 0) {\n            return {\n                type: \"invalid-token\"\n            };\n        }\n        throw e;\n    }\n    return {\n        type: \"valid\",\n        session: result\n    };\n}\nexports.decodeSession = decodeSession;\nfunction checkExpirationStatus(token) {\n    var now = Date.now();\n    if (token.expires > now)\n        return \"active\";\n    // Find the timestamp for the end of the token's grace period\n    var threeHoursInMs = 3 * 60 * 60 * 1000;\n    var threeHoursAfterExpiration = token.expires + threeHoursInMs;\n    if (threeHoursAfterExpiration > now)\n        return \"grace\";\n    return \"expired\";\n}\nexports.checkExpirationStatus = checkExpirationStatus;\n\n\n//# sourceURL=webpack:///./src/auth/services/jwt.service.ts?");

/***/ }),

/***/ "./src/middleware/auth.middleware.ts":
/*!*******************************************!*\
  !*** ./src/middleware/auth.middleware.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jwt_service_1 = __webpack_require__(/*! ../auth/services/jwt.service */ \"./src/auth/services/jwt.service.ts\");\n/**\n * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.\n */\nvar jwtKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';\nfunction requireJwtMiddleware(request, response, next) {\n    var unauthorized = function (message) { return response.status(401).json({\n        ok: false,\n        status: 401,\n        message: message\n    }); };\n    var requestHeader = \"X-JWT-Token\";\n    var responseHeader = \"X-Renewed-JWT-Token\";\n    var header = request.header(requestHeader);\n    if (!header) {\n        unauthorized(\"Required \" + requestHeader + \" header not found.\");\n        return;\n    }\n    var decodedSession = jwt_service_1.decodeSession(jwtKey, header);\n    if (decodedSession.type === \"integrity-error\" || decodedSession.type === \"invalid-token\") {\n        unauthorized(\"Failed to decode or validate authorization token. Reason: \" + decodedSession.type + \".\");\n        return;\n    }\n    var expiration = jwt_service_1.checkExpirationStatus(decodedSession.session);\n    if (expiration === \"expired\") {\n        unauthorized(\"Authorization token has expired. Please create a new authorization token.\");\n        return;\n    }\n    var session;\n    if (expiration === \"grace\") {\n        // Automatically renew the session and send it back with the response\n        var _a = jwt_service_1.encodeSession(jwtKey, decodedSession.session), token = _a.token, expires = _a.expires, issued = _a.issued;\n        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });\n        response.setHeader(responseHeader, token);\n    }\n    else {\n        session = decodedSession.session;\n    }\n    // Set the session on response.locals object for routes to access\n    response.locals = __assign(__assign({}, response.locals), { session: session });\n    // Request has a valid or renewed session. Call next to continue to the authenticated route handler\n    next();\n}\nexports.requireJwtMiddleware = requireJwtMiddleware;\n\n\n//# sourceURL=webpack:///./src/middleware/auth.middleware.ts?");

/***/ })

};