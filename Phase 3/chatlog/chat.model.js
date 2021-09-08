let mongoose = require("mongoose");
mongoose.pluralize(null);

let chatSchema = mongoose.Schema({
    userName:String,
    userMsg:String
});

let chatModel = mongoose.model("Chatlog", chatSchema);
module.exports=chatModel;