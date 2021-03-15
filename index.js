const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser'); // express 최신 버전에서는 더이상 필요 없음
const cookieParser = require('cookie-parser');

const {User} = require('./models/user');

// db 연결
mongoose.connect('mongodb+srv://hyun:qwe1asd@boilerplate.yl0ea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    , {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

// body , cookie 정보 받기
//app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
app.use(cookieParser())

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body) // body parser 로 받은 값을 user 오브젝트 형태로 인스턴스화 해줌

    //save = mongoose method (insert)
    user.save((err, userData) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success : true})
    })

})

app.listen(5000);
