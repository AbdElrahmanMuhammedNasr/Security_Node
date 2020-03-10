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

// login

router.post('/login' , async (req, res) =>{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).json({ErrorMessage: "email or password is wrong"});
        const isPassCorrect = await bcrypt.compare(req.body.password , user.password);
        if(!isPassCorrect) return  res.status(400).json({message: "email or password is wrond"});

        res.send(200).json({
            message: "Success"
        })
});


module.exports =router;
