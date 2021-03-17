const express = require('express');
const app = express();
const models = require('./models/index')
//const mysqldb = require('./config/database')();
//const connection = mysqldb.init();

//const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // express 최신 버전에서는 더이상 필요 없음
const cookieParser = require('cookie-parser');
// 환경별 config 값
//const config = require('./config/key');

//const {User} = require('./models/user');

//mysqldb.test_open(connection)

/*models.sequelize.sync().then(() => {
    console.log('DB Connected')
}).catch(err => {
    console.log('Error', err)
})*/

app.get('/', (req, res) => {
    models.users.findAll().then(result => {
        res.json(result)
    })
})


// db 연결
/*mongoose.connect( config.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));*/

// body , cookie 정보 받기
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())


app.post('/api/users/register', (req, res) => {

    models.user.create({
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        password: req.body.password
    })
        .then(result => {
            console.log('data insert')
        })
        .catch(err => {
            console.log('error', err)
        })

})


app.listen(5000);
