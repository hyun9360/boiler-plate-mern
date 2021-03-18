const express = require('express');
const app = express();
const models = require('./models/index')
const bodyParser = require('body-parser'); // express 최신 버전에서는 더이상 필요 없음
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return res.json({success: false, err});

        bcrypt.hash(body.password, salt, function (err, hash) {
            if (err) return res.json({success: false, err});

            // 암호화 성공 시 insert
            models.User.create({
                email: body.email,
                name: body.name,
                lastname: body.lastname,
                password: hash
            })
                .then(result => {
                    res.status(200).json({success: true, userData: result})
                })
                .catch(err => {
                    res.json({success: false, err})
                })
        })
    })

})


app.listen(5000);
