let express = require("express");
let app = express();
let mongoose = require("mongoose");
let chatModel = require("./chat.model");
let http = require("http").Server(app);
let io = require("socket.io")(http);

let dbURL = "mongodb://localhost:27017/tcsmean";
mongoose.connect(dbURL).
then(res=>console.log("connected to mongodb")).catch(err=>(console.log(err)));

app.get("/",(request,response) => {
    response.send("Welcome, please navigate to /index to get started!");
});

app.get("/index", (request,response)=>{
    response.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket)=>{
    console.log("Client chatlog is connected");
    socket.on("clientSent", (msg)=>{
        let newMsg = JSON.parse(msg);
        chatModel.insertMany(newMsg, (res,err)=>{
            if(!err){
                console.log(res);
            }else{
                console.log(err);
            }
        });
    });
});


http.listen(9090, ()=>console.log("...listening"));