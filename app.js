var express = require("express");

var bodyParser = require("body-parser");


var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");

var items = [];

let workItems = [];

app.get("/", function(req, res) {

  var today = new Date();

  var currentDay = today.getDate();

  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);



  res.render("list", {
    kindofday: day,
    newlistItems: items
  });



});


app.post("/", function(req, res) {

  var item = req.body.toList;

  if (req.body.list === "workList") {

    workItems.push(item);
    res.redirect("/work");
  } else {



    items.push(item);

    res.redirect("/");


  }




});

app.get("/work", function(req, res) {

  res.render("list", {
    kindofday: "workList",
    newlistItems: workItems
  });

});

app.get("/contact" , function(req , res){

   res.render("contact");

});

//app.post("/work", function(req, res) {

//let item = req.body.workItems;

//workItems.push(item);

//res.redirect("/");
//});

app.listen(3000, function(req, res) {

  console.log("port is running on server 3000");

})
