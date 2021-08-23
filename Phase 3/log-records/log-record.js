let readline = require("readline-sync");
let fs = require("fs");
debugger;

let fname = readline.question("Enter your first name: ");
let lname = readline.question("Enter your last name: ");
let gender = readline.question("Enter your gender: ");
let email = readline.questionEMail("Enter your email: ");

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

debugger; let user = {userFname:fname, userLname:lname, userGender:gender, userEmail:email, userTime:dateTime};

let userLog = JSON.parse(fs.readFileSync("users.json").toString());
userLog.push({user});
fs.writeFileSync("users.json",JSON.stringify(userLog));




