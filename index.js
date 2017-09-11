"use strict";

let express = require("express");
let app = express();

app.get('/', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/index.html");
});

let port = process.env.PORT || 5050;
app.listen(port);

console.log("Server works on port " + port);
