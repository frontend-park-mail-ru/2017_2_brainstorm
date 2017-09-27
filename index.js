"use strict";

const express = require('express');
const app = express();

const APPLICATION_PORT = 5050;

app.get('/', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/index.html");
});

const port = process.env.PORT || APPLICATION_PORT;

app.listen(port);
