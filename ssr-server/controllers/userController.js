const User = require("../models/User");
const {nanoid} = require("nanoid");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }

    await User.findOne({
        email:req.body.email,
    })
    .then(async user => {
        if(!user){

            const isUsername = await User.findOne({
                username:req.body.username
            });
            if(isUsername){
                return res.status(400).send({msg:'The User with that username already exists!'});
            }else{
                const newUser = new User({
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    tokenConfirm:nanoid(),
                })
                newUser.save();

                const transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: process.env.EMAIL_NAME,
                      pass: process.env.PASSWORD_EMAIL
                    }
                });
                await transport.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>',
                    to: req.body.email,
                    subject: "Registration confirmation",
                    html: `<a href="http://localhost:3000/confirm-register/${newUser.tokenConfirm}">Confirm your account here!</a>`,
                });

                return res.status(200).send({msg:'Successful registration. Please check your email to confirm!',token_confirm:newUser.tokenConfirm});
            }
        }
        return res.status(400).send({msg:'The User with that email already exists!'});
    })
    .catch(error => {
        return res.status(500).send({error:error.message});
    })
}

const loginUser = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }

    await User.findOne({
        email:req.body.email,
    })
    .then(user => {
        console.log(user);
        if(!user){
            return res.status(404).send({msg:'User does not exists!'});
        }

        if(!user.confirmAccount){
            return res.status(401).send({msg:'You need to confirm your account to login!'})
        }

        const hashedPassword = req.body.password;
        const passwordIsValid = bcrypt.compareSync(hashedPassword,user.password);

        if(!passwordIsValid){
            return res.status(400).send([{msg:'Password invalid!'}]);
        }

        req.login(user,function(err){
            if(err){
                return res.status(401).send({msg:'Error al crear la sesion!'});
            }
            return res.status(200).json(user);
        })
    })
    .catch(error => {
        return res.status(500).send({error:error.message});
    })
}

const logout = (req,res) =>{
    req.logout();
    // delete req.headers['X-CSRF-Token'];
    return res.status(200).send({msg:'Logged out succesfully!'});
}

const confirmToken = async(req,res) => {

    console.log(req.params)

    await User.findOne({
        tokenConfirm:req.params.confirmToken,
    })
    .then(user => {
        if(!user){
            res.status(404).send({msg:'Not found that User!'});
            return;
        }
        if(!user.confirmAccount){
            user.confirmAccount = true;
            user.tokenConfirm = null;

            user.save();

            return res.status(200).json(user);
        }
        return res.send({msg:'This account is already validated!'})
    })
    .catch(error => {
        res.status(500).send({error:error.message});
    })
}

module.exports = {
    registerUser,
    confirmToken,
    loginUser,
    logout,
}