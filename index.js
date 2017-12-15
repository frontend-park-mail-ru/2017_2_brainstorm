"use strict";

const express = require('express');
const app = express();

const APPLICATION_PORT = 5055;

// app.use(express.static(__dirname + "/static"));

app.get('/*', function(req, res) {
    res.sendfile("static/index.html");
});

const port = process.env.PORT || APPLICATION_PORT;

app.listen(port);
