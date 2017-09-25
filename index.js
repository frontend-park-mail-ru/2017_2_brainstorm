"use strict";

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();

const APPLICATION_PORT = 5550;

app.get('/', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/index.html");
});

let port = process.env.PORT || APPLICATION_PORT;

app.listen(port);
