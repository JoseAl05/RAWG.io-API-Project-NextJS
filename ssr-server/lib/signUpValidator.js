const {body} = require('express-validator');

const signUpSchema = {
    username:{
        in:['body'],
        trim:true,
        escape:true,
        notEmpty:true,
        errorMessage:'Username cannot be blank!',
        isLength:{
            options:{
                min:6
            },
            errorMessage:'Username must be at least 6 characters long!',
        }
    },
    email:{
        in:['body'],
        trim:true,
        isEmail:{
            bail:true,
            errorMessage:'Insert a valid email!'
        },
        normalizeEmail:true,
        notEmpty:true,
        errorMessage:'Email cannot be blank!',
    },
    password:{
        in:['body'],
        trim:true,
        notEmpty:true,
        errorMessage:'Password cannot be blank!',
        isLength:{
            options:{
                min:6
            },
            errorMessage:'Password must be at least 6 characters long!'
        },
        escape:true,
        custom:{
            options:(value,{req}) =>{
                if(value !== req.body.repassword){
                    throw new Error('Passwords not match!');
                }
                return value;
            }
        }
    }
}

module.exports = {
    signUpSchema
};