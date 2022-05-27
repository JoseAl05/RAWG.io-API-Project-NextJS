const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true,
    },
    tokenConfirm:{
        type:String,
        default:null
    },
    confirmAccount:{
        type:Boolean,
        default:false,
    }
});

userSchema.pre('save', async function(next){
    const user =  this;
    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);

        user.password = hash;
    } catch (error) {
        console.log(error);
        next();
    }
})

module.exports = mongoose.model('User',userSchema);