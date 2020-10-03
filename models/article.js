const mongoose = require('mongoose'),
{Schema} = mongoose

let articleSchema = new Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    body:{type:String, required:true},
    user_id:{type:Schema.Types.ObjectId}
})

module.exports = mongoose.model('articles', articleSchema)