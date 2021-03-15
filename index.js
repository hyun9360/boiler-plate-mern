const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://hyun:qwe1asd@boilerplate.yl0ea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    , {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(5000);
