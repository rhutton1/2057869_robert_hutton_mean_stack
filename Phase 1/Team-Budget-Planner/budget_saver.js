// create our init array
function pushData() {

    // pull the values from the form .. dont forget the .value at end
    let clientName = document.getElementById("clientName").value;
    let projectName = document.getElementById("projectName").value;
    let budget = document.getElementById("budget").value;

    // form data into a new obj and add obj to array
    let newEntry = {client: clientName, project: projectName, money:budget};
    var Entries = []
    Entries = JSON.parse(localStorage.getItem("entries"));
    Entries.push(newEntry);

    console.log(Entries);

    //store our entries
    localStorage.setItem("entries", JSON.stringify(Entries));
}

function pullData() {

    // get item from local storage
    let financeEntriesJson = JSON.parse(localStorage.getItem("entries"));

    console.log(financeEntriesJson);

    //set up our table
    var tableStart = "<table border = 1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    var tableContent = "";
    var totalCost = 0;

    financeEntriesJson.forEach(Element => {
        tableContent += "<tr><td>" + Element.client + "</td><td>" + Element.project + "</td><td>" + Element.money + "</td></tr>";
        totalCost += parseInt(Element.money);
    });

    var endTable = "</table>";
    var totalCostPrint = "Total Budget Cost: " + totalCost;

    ourTable = tableStart + tableContent + endTable;
    document.getElementById("mainTable").innerHTML=ourTable;
    document.getElementById("total").innerHTML=totalCostPrint;
    console.log(ourTable);
}
