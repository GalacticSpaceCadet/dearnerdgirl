//listing the node dependencies for server
var express = require("express");
var bodyParser = require("body-parser");

//inform node we are creating an express server
var app = express();
var PORT = process.env.PORT || 3000;

//Adding body parser so the data can be interpreted
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

//Bellow we point the server to route files.
// Mapping where it needs to retrieve and send data.
//IE("./app/routing/htmlRoutes")(app);


//Listner will now start the server
app.listen(PORT, function() {
console.log("App listening on PORT: " + PORT);
});


