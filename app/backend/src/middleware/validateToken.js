const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    // Try to get the token from Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // If not found, try to get the token from cookies
    if (!token) {
         token = req.cookies.jwt;  
    }

    if (!token) {
        res.status(400);
        throw new Error("Token not found");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error("User unauthorized");
        }
        req.user = decoded.user;
        next();
    });
});

module.exports = validateToken;
