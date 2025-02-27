// loggerMiddleware.js
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
};

module.exports = loggerMiddleware;