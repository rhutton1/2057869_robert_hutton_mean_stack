// set up initial array and variables
var itemCount = 0;
var myCart = [];
function addToCart(itemID, itemPrice, itemQuan) {
    // push new items on array
    myCart.push({ id: itemID, price: itemPrice, quan: itemQuan });
    // take inventory and log it
    itemCount += +itemQuan;
    console.log(itemCount);
    document.getElementById("cartSize").innerHTML = itemCount.toString();
    // and finally store the values
    sessionStorage.setItem("cart", JSON.stringify(myCart));
}
function viewMyCart() {
    // pull data from storage 
    var myCartJSON = JSON.parse(sessionStorage.getItem("cart"));
    // set up the table for user
    var tableStart = "<table border = 1><tr><th>Item Name</th><th>Price</th></tr>";
    var tableContent = "";
    var totalCost = 0;
    // loop through to create the table rows
    myCartJSON.forEach(function (Element) {
        tableContent += "<tr><td>" + Element.id + "(" + Element.quan + ")" + "</td><td>" + Element.price * Element.quan + "</td></tr>";
        totalCost += (parseFloat(Element.price) * Element.quan);
    });
    totalCost = Math.round(100 * totalCost) / 100;
    // wrap up table
    var endTable = "</table>";
    var totalCostPrint = "Total Cost: " + totalCost;
    var ourTable = tableStart + tableContent + endTable;
    document.getElementById("cartTable").innerHTML = ourTable;
    document.getElementById("totalPrice").innerHTML = totalCostPrint;
}
