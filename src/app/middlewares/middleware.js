const jwt = require('jsonwebtoken');
const User = require('../models/users-model');
const middleware = {};

middleware.authToken = async function (req, res, next) {
    let token = req.header('Authorization');
    console.log('Headers-token: ', token);
    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err)
                next(err);  //Error, trying to access unauthorized page!
            else {
                if (decoded.exp <= Date.now()) {
                    var err = new Error("Access token has expired");
                    next(err);  //Error, trying to access unauthorized page!
                }
                req.decoded = decoded;
            }
        });
        const user = await User.findOne({ _id: req.decoded._id, 'tokens.token': token })
        if (!user) {
            var err = new Error("User token not found");
            next(err);
        }
        req.user = user
        req.token = token
        next();
    } else {
        var err = new Error("Token no proveída.");
        next(err);  //Error, trying to access unauthorized page!
    }
}
module.exports = middleware