function addBlogCard(){
    // grab our information
    var title = document.getElementById("title").value;
    var articles = document.getElementById("articles").value;
    var img = document.getElementById("img").value;

    let cardStart = "<div class=\"col-4\"><div class=\"card\">";
    let cardImg = "<img class=\"card-img-top\" src=\"" + img + "\"alt=\"No Image\"width=\"400px\" height=\"250px\"";
    let cardBody = "<div class=\"card-body\"><h4 class=\"card-title\">" + title + "</h4><p class=\"card-text\">" + articles + "</p></div></div></div>";
    let newCard = cardStart + cardImg + cardBody;

    document.getElementById("row1").innerHTML+=newCard;

} 
