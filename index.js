"use strict";

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());

const users = {};
const ids = {};

let validData = 'abcdefghijklmnopqrstuvwxyz';
validData += validData.toUpperCase() + '1234567890';

app.post('/reg', function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    if (!login || !password) {
        return res.status(400).end();
    }

    for (let i = 0; i < login.length; i++) {
        if (validData.indexOf(login[i]) === -1) {
            return res.status(400).end();
        }
    }

    for (let i = 0; i < password.length; i++) {
        if (validData.indexOf(password[i]) === -1) {
            return res.status(400).end();
        }
    }

    if (!users[login]) {
        users[login] = {
            login,
            password,
        };
    }
    else {
        return res.status(400).end();
    }

    const id = uuid();
    ids[id] = login;

    res.json({id});
});

app.post('/auth', function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    if (!login || !password) {
        return res.status(400).end();
    }

    for (let i = 0; i < login.length; i++) {
        if (validData.indexOf(login[i]) === -1) {
            return res.status(400).end();
        }
    }

    for (let i = 0; i < password.length; i++) {
        if (validData.indexOf(password[i]) === -1) {
            return res.status(400).end();
        }
    }

    if (!users[login]) {
        return res.status(400).end();
    }

    if (users[login].password === password) {
        const id = uuid();
        ids[id] = login;

        res.cookie('bubble', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
        res.json({id});
    }
    else {
        return res.status(400).end();
    }
});

app.get('/me', function (req, res) {
    const id = req.cookies['bubble'];
    const login = ids[id];
    if (!login || !users[login]) {
        return res.status(401).end();
    }

    res.json(users[login]);
});


app.get('/', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/index.html");
});

let port = process.env.PORT || 5050;

app.listen(port);

console.log("Server works on port " + port);
