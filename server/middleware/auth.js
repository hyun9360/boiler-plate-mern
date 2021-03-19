const models = require('../models')

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    models.User.findByToken(token, (err, userInfo) => {
        if (err) throw err;
        if (!userInfo) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = userInfo;

        next();
    })
}

module.exports = {auth}