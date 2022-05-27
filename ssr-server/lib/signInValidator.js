const signInSchema = {
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
    }
}

module.exports = {
    signInSchema
};