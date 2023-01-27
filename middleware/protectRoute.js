const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports.protectRoute = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, SECRET_KEY);
        next()
    } catch (err) {
        return res.status(401).json({ message: "Not Authorized!!!" });
    }
};
