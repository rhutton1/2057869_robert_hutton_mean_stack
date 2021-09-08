let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let courseModel = require("./course.model");

// grab and set up url for use
let dbURL = "mongodb://localhost:27017/tcsmean";
//establish a connection to the db
mongoose.connect(dbURL).
then(res=>console.log("connected to db")).catch(err=>console.log(err));

let app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(request,response) => {
    response.send("Welcome, please navigate to /index to get started!");
})

app.get("/index",(request,response) => {
    response.sendFile(__dirname+"/index.html");
})

app.get("/addCourse",(request,response) => {
    response.sendFile(__dirname+"/addCourse.html");
})

app.post("/add",(request,response)=>{
    let courseDetail = request.body;
    courseModel.insertMany(courseDetail, (err,res)=>{
        if(!err){
            response.write("Successful");
        }else{
            response.write("Non-unique course id error");
        }
    })
    response.sendFile(__dirname+"/addCourse.html");
});

app.get("/updateCourse",(request,response) => {
    response.sendFile(__dirname+"/updateCourse.html");
})

app.get("/update", (request,response)=>{
    let updateAmount = request.query.cAmount;
    let updateId = request.query._id;
    courseModel.updateOne({_id:updateId},{$set:{cAmount:updateAmount}},(err,result)=> {
            if(!err){
                console.log("Successful");
            }
    });
    response.sendFile(__dirname+"/updateCourse.html");
});

app.get("/deleteCourse",(request,response) => {
    response.sendFile(__dirname+"/deleteCourse.html");
})

app.get("/delete", (request,response)=>{
    let deleteId = request.query._id;
    courseModel.deleteOne({_id:deleteId},(err,result)=> {
        if(!err){
            console.log("Successful");
        }
    });
    response.sendFile(__dirname+"/deleteCourse.html");
});

app.get("/fetchCourse",(request,response) => {
    response.sendFile(__dirname+"/fetchCourse.html");
})

app.get("/list",(request,response)=>{
    let tableContent = "";
    let tableStart = "<table border=\"1\"><tr><th>Course ID</th><th>Course Name</th><th>Course Description</th><th>Course Cost Amount</th></tr>";
    let tableEnd = "</table>"
    courseModel.find({},(err,data)=> {
        if(!err){
            data.forEach(element => {
                tableContent += "<tr><td>"+ element._id +"</td><td>"+ element.cName +"</td><td>"+ element.cDescription +"</td><td>"+ element.cAmount +"</td></tr>";            
            });
            response.write(tableStart + tableContent + tableEnd);
        }else {
            response.write(err);   
        }
    })
    
})

app.listen(9090, ()=>console.log("listening..."));