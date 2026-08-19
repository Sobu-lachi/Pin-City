/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

// A Middleware function to guard routes
function verifyToken(req, res, next) {
    const accessToken = req.cookies.accessToken;

    

    if (!accessToken) {
        return res.status(401).json({ message: "Access denied. No access token." });
    }

    jwt.verify(accessToken, 
        process.env.JWT_SECRET_TOKEN, 
        (err, decodedPayload) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired session token." });
            }

        req.user = decodedPayload; 
        
        next(); 
    });
}

export {verifyToken}