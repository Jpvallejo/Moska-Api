import { Request, Response, NextFunction } from "express";
import { DecodeResult, ExpirationStatus, Session } from "../auth/services/interfaces";
import { decodeSession, encodeSession, checkExpirationStatus } from "../auth/services/jwt.service";

/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
const jwtKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';

export function requireJwtMiddleware(request: Request, response: Response, next: NextFunction) {
    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    });

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = request.header(requestHeader);
    
    if (!header) {
        return unauthorized(`Required ${requestHeader} header not found.`);
    }

    const decodedSession: DecodeResult = decodeSession(jwtKey, header);
    
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        return unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") {
        return unauthorized(`Authorization token has expired. Please create a new authorization token.`);
    }

    let session: Session;

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const { token, expires, issued } = encodeSession(jwtKey, decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };

        response.setHeader(responseHeader, token);
    } else {
        session = decodedSession.session;
    }

    // Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session
    };

    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}