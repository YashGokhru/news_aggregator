const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

function getCookie(cookieName, cookieString) {
    if (!cookieString) {
        return null;
    }
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(cookieString);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

const validateToken = asyncHandler(async (req, res, next) => {
    let token = null;

    // Try to get the token from Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // If not found, try to get the token from cookies
    if (!token) {
        const cookieString = req.headers.cookie;
        token = getCookie("accessToken", cookieString);
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
