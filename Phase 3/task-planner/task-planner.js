let http = require("http");
let fs = require("fs");
let url = require("url");

let taskPlannerPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Welcome to Our Task Planner</h2>
    <a href="addTask">Add a Task!</a> |
    <a href="delTask">Delete a task!</a> |
    <a href="listTask"> List our tasks!</a>
</body>
</html>
`

let addTaskPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="logNewTask">
        <h3>Add a task!</h3>
        <label>Empoyee ID:</label>
        <input type="text" name="empId"/>
        <label>Task ID:</label>
        <input type="text" name="taskId"/>
        <label>Task:</label>
        <input type="text" name="task"/>
        <label>Deadline:</label>
        <input type="date" name="deadline"/>
        <input type="submit" value="Add Task"/>
    </form>
    <a href="taskPlanner">Home</a><br/>
</body>
</html>
`
let deleteTaskPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="delOldTask">
        <h3>Delete a task!</h3>
        <label>Task ID:<label>
        <input type="text" name="taskId"/>
        <input type="submit" value="Delete Task"/>
    </form>
    <a href="taskPlanner">Home</a><br/>
</body>
</html>
`

let listTaskPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="listTasks">
        <h3>List of tasks!</h3>
        <input type="submit" value="List Tasks" />
    </form>
    <div></div>
    <a href="taskPlanner">Home</a><br/>
</body>
</html>
`

let server = http.createServer((request, response) => {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.co"){
        if(urlInfo.path == "/taskPlanner"){
            response.write(taskPlannerPage);

        }else if(urlInfo.path == "/addTask"){
            response.write(addTaskPage);

        }else if(urlInfo.pathname == "/logNewTask"){
            let inputTask = urlInfo.query;
            let taskLog = JSON.parse(fs.readFileSync("tasks.json").toString());
            let idCheck = taskLog.find(i => i.taskId == inputTask.taskId);
            response.writeHead(200,{"content-type":"text/html"});
            if(idCheck == undefined){
                taskLog.push({empId:inputTask.empId, taskId:inputTask.taskId, task:inputTask.task, deadline:inputTask.deadline});
                fs.writeFileSync("tasks.json",JSON.stringify(taskLog));
                response.write(addTaskPage);
            }else{
                response.write("ERROR: Task must be unique!");
                response.write(addTaskPage);
            }

        }else if(urlInfo.path == "/delTask"){
            response.write(deleteTaskPage);

        }else if(urlInfo.pathname == "/delOldTask"){
            let inputTask = urlInfo.query;
            let taskLog = JSON.parse(fs.readFileSync("tasks.json").toString());
            let idCheck = taskLog.find(i => i.taskId == inputTask.taskId);
            response.writeHead(200,{"content-type":"text/html"});
            if(idCheck != undefined){
                let index = taskLog.findIndex(i => i.taskId == inputTask.taskId);
                taskLog.splice(index, 1);
                fs.writeFileSync("tasks.json",JSON.stringify(taskLog));
                response.write(deleteTaskPage);
            }else{
                response.write("ERROR: Task ID not found!");    
                response.write(deleteTaskPage);
            }

        }else if(urlInfo.path == "/listTask"){
            response.write(listTaskPage);

        }else if(urlInfo.pathname == "/listTasks"){
            let taskLog = JSON.parse(fs.readFileSync("tasks.json").toString());
            let tableStart = "<table border=\"1\"><tr><th>Employee ID</th><th>Task ID</th><th>Task</th><th>Deadline</th></tr>";
            let tableContent = "";
            let tableEnd = "</table>"
            
            taskLog.forEach(element => {
                tableContent += "<tr><td>"+ element.empId +"</td><td>"+ element.taskId +"</td><td>"+ element.task +"</td><td>"+ element.deadline +"</td></tr>";                
            });

            response.write(listTaskPage + tableStart + tableContent + tableEnd);

        }else{
            response.write("Page Not Found... Please Navigate to /taskPlanner");
        }
    }
    response.end();
})

server.listen(9090, ()=> console.log("listening..."));