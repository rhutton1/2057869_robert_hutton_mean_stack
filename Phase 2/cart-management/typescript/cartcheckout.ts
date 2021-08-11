// set up initial array and variables
let itemCount:number = 0;
let myCart:{id:string, price:number, quan:number}[]=[];

function addToCart(itemID:string, itemPrice:number, itemQuan: number) : void{

    // push new items on array
    myCart.push({id:itemID, price:itemPrice, quan: itemQuan});

    // take inventory and log it

    itemCount += +itemQuan;

    console.log(itemCount);

    document.getElementById("cartSize").innerHTML =  itemCount.toString();

    // and finally store the values
    sessionStorage.setItem("cart", JSON.stringify(myCart));
}

function viewMyCart() : void {

    // pull data from storage 
    let myCartJSON = JSON.parse(sessionStorage.getItem("cart"));

    // set up the table for user
    const tableStart = "<table border = 1><tr><th>Item Name</th><th>Price</th></tr>";
    let tableContent = "";
    let totalCost = 0;

    // loop through to create the table rows
    myCartJSON.forEach(Element => {
        tableContent += "<tr><td>" + Element.id + "(" + Element.quan + ")" + "</td><td>" + Element.price * Element.quan + "</td></tr>";
        totalCost += (parseFloat(Element.price) * Element.quan);
    });


    totalCost = Math.round(100*totalCost)/100;

    // wrap up table
    const endTable = "</table>";
    let totalCostPrint = "Total Cost: " + totalCost;
    let ourTable = tableStart + tableContent + endTable;
    document.getElementById("cartTable").innerHTML=ourTable;
    document.getElementById("totalPrice").innerHTML=totalCostPrint;
}