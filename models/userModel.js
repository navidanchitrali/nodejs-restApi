const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    createdAt:{
        type:String,
        required: false
    },
    

});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;