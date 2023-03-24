//steps:
// 1. Define Schema -> Note: id, userid, title, content, dateadded
// 2. Create Model -> <model name> <Schema> Note
const mongoose = require("mongoose");

const noteSchema=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    dateadded:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("Note",noteSchema);
