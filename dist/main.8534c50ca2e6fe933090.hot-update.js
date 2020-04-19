exports.id = "main";
exports.modules = {

/***/ "./src/middleware/auth.middleware.ts":
/*!*******************************************!*\
  !*** ./src/middleware/auth.middleware.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jwt_service_1 = __webpack_require__(/*! ../auth/services/jwt.service */ \"./src/auth/services/jwt.service.ts\");\n/**\n * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.\n */\nvar jwtKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';\nfunction requireJwtMiddleware(request, response, next) {\n    console.log('holis');\n    var unauthorized = function (message) { return response.status(401).json({\n        ok: false,\n        status: 401,\n        message: message\n    }); };\n    var requestHeader = \"X-JWT-Token\";\n    var responseHeader = \"X-Renewed-JWT-Token\";\n    var header = request.header(requestHeader);\n    if (!header) {\n        console.log('llega aca');\n        unauthorized(\"Required \" + requestHeader + \" header not found.\");\n        return;\n    }\n    var decodedSession = jwt_service_1.decodeSession(jwtKey, header);\n    if (decodedSession.type === \"integrity-error\" || decodedSession.type === \"invalid-token\") {\n        unauthorized(\"Failed to decode or validate authorization token. Reason: \" + decodedSession.type + \".\");\n        return;\n    }\n    var expiration = jwt_service_1.checkExpirationStatus(decodedSession.session);\n    if (expiration === \"expired\") {\n        unauthorized(\"Authorization token has expired. Please create a new authorization token.\");\n        return;\n    }\n    var session;\n    if (expiration === \"grace\") {\n        // Automatically renew the session and send it back with the response\n        var _a = jwt_service_1.encodeSession(jwtKey, decodedSession.session), token = _a.token, expires = _a.expires, issued = _a.issued;\n        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });\n        response.setHeader(responseHeader, token);\n    }\n    else {\n        session = decodedSession.session;\n    }\n    // Set the session on response.locals object for routes to access\n    response.locals = __assign(__assign({}, response.locals), { session: session });\n    // Request has a valid or renewed session. Call next to continue to the authenticated route handler\n    next();\n}\nexports.requireJwtMiddleware = requireJwtMiddleware;\n\n\n//# sourceURL=webpack:///./src/middleware/auth.middleware.ts?");

/***/ })

};