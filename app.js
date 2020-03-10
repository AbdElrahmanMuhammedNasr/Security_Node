const express = require('express');
const app = express();

// import mmongoose
const mongoose = require('mongoose');
//impoer body parser
const bodyParser = require('body-parser');

// import auth router
const  authRouter = require('./routes/auth');


app.use(bodyParser.json());
app.use('/api/user', authRouter);


// connect  to mongon
mongoose.connect('mongodb://localhost:27017/Auth', {useNewUrlParser: true}).then(
    (result) =>{
        console.log('Connected')
        app.listen(3002)
    }
).catch(err => console.log(err));

