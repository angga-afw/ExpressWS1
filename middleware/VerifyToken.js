const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        return res.status(401).json({
            status : 'error in jwt',
            message: 'Token is empty'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status : 'error in jwt',
                message: 'Token is invalid'
            });
        }
        req.email = decoded.email;
        next();
    });
}