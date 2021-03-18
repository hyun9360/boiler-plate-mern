const express = require('express');
const app = express();
const models = require('./models/index')
const bodyParser = require('body-parser'); // express 최신 버전에서는 더이상 필요 없음
const cookieParser = require('cookie-parser');


/*models.sequelize.sync().then(() => {
    console.log('DB Connected')
}).catch(err => {
    console.log('Error', err)
})*/

app.get('/', (req, res) => {
    models.User.findAll().then(result => {
        res.json(result)
    })
})

// body , cookie 정보 받기
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/api/users/register', (req, res) => {

    let body = req.body;

    models.User.generatePassword(body.password).then(result => {
        // 암호화 성공 시 insert
        models.User.create({
            email: body.email,
            name: body.name,
            lastname: body.lastname,
            password: result
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

function generateToken(user, cb) {
    // var token = jwt.sign(user.id, 'secret')
    //
    // console.log("token : ", token)


}

app.post('/api/users/login', (req, res) => {

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

                models.User.update(
                    {
                        token: token
                    },
                    {
                        where: {id: userInfo.id}
                    })
                    .then(result => {
                        // console.log('login success : ' + result)
                        res.cookie('x_auth', token)
                            .status(200)
                            .json({
                                loginSuccess: true
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

app.listen(5000);
