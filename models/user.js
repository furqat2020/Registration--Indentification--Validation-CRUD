const mongoose = require('mongoose')
const {Schema} = mongoose

let userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
})

module.exports = mongoose.model('User', userSchema)