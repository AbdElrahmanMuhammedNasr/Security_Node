const router  = require('express').Router();

// import use model
const User = require('../model/User');
//validation the input
const joi = require('@hapi/joi');
// import bcrypt
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) =>{

    //check if the email is  exit
    const checkByEmail = await User.findOne({email: req.body.email});
    if(checkByEmail){
        return  res.status(400).json({
            message: "this emial is exits"
        })
    }
    // hssh the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword =await bcrypt.hash(req.body.password, salt);

    // create nre user
   const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
   try {
       const savedUser = await user.save();
       res.status(201).send(savedUser);
   }catch (e) {
       res.status(400).send(e);
   }

});

// router.post('/login')


module.exports =router;
