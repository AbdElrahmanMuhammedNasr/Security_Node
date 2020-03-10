const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 10
    },
    email:{
        type: String,
        required: true,
        max: 100
    },
    password:{
        type: String,
        required: true,
        max: 1000,
        min: 10
    },
    date:{
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model('User', userSchmea);
