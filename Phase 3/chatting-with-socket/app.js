let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"/index.html");
})

let serverResponses = ["Hello! How are you today?",
"What can we help you with?",
"For that issue please call our support line at: 123-456-7890.",
"Sure! We can help you with that!",
"Unfortunately, you will have to visit our in person store to resolve this issue",
"Can you elaborate on that?"];

io.on("connection",(socket)=>{
    console.log("Client Connected");
    //
    socket.on("clientSent", (msg)=>{
        console.log(msg);
        let randomNumber = Math.floor(Math.random()*serverResponses.length);
        socket.emit("serverSent", serverResponses[randomNumber]);
    })
})

http.listen(9090, () => console.log("listening..."));