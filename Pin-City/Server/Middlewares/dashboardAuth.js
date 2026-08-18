/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

// A Middleware function to guard routes
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN, (err, decodedPayload) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired session token." });
        }

        req.user = decodedPayload; 
        
        next(); 
    });
}

export {verifyToken}