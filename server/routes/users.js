const express = require('express');
const router = express.Router();
const models = require('../models')
const { auth } = require("../middleware/auth");
const moment = require('moment');

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        id: req.user.id,
        isAdmin: req.user.role !== 0,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

router.post('/register', (req, res) => {
    let body = req.body;

    models.User.generatePassword(body.password).then(result => {
        // 암호화 성공 시 insert
        models.User.create({
            email: body.email,
            name: body.name,
            lastname: body.lastname,
            password: result,
            image: body.image
        })
            .then(result => {
                res.status(200).json({success: true, userData: result})
            })
            .catch(err => {
                res.json({success: false, err})
            })
    }).catch(err => {
        res.json({success: false, err})
    })
})

router.post('/login', (req, res) => {
    // find the email
    models.User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userInfo => {
            // compare Password
            models.User.comparePassword(req.body.password, userInfo.password, (err, isMatch) => {

                if (!isMatch) return res.json({loginSuccess: false, message: "wrong password"})
                // generate Token
                let token = models.User.generateToken(userInfo.id)
                var oneHour = moment().add(1, 'hour').valueOf();

                models.User.update(
                    {
                        token: token,
                        tokenExp: oneHour
                    },
                    {
                        where: {id: userInfo.id}
                    })
                    .then(result => {
                        res.cookie("w_authExp", oneHour);
                        res.cookie('x_auth', token)
                            .status(200)
                            .json({
                                loginSuccess: true,
                                userId: userInfo.id
                            })
                    })
                    .catch(err => {
                        res.status(400).send(err)
                    });
            })
        })
        .catch(err => {
            res.json({loginSuccess: false, message: "Auth failed, email not found", err})
        })
})

router.get('/logout', auth, (req, res) => {
    models.User.update(
        {token: "", tokenExp: 0}
        , {where: {id: req.user.id}}
    )
        .then(result => {
            res.status(200).json({success: true})
        })
        .catch(err => {
            res.json({success: false, err})
        })
})

module.exports = router;