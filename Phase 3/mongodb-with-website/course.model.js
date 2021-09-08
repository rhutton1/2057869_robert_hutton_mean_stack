let mongoose = require("mongoose");
mongoose.pluralize(null);

let courseSchema = mongoose.Schema({
    _id:Number,
    cName:String,
    cDescription:String,
    cAmount:Number
});

let courseModel = mongoose.model("Courses",courseSchema);
module.exports=courseModel;