"use strict";

export default class RequestToHost {
    auth(login, password, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://bubblerise-backend.herokuapp.com/api/users/signin', true);
        xhr.withCredentials = true; //for cookies

        const user = {login, password};
        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (+xhr.status !== 200) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };

        xhr.send(body);
    }

    reg(login, password, email, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://bubblerise-backend.herokuapp.com/api/users/signup', true);
        xhr.withCredentials = true; //for cookies

        const user = {login, password, email};
        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (+xhr.status !== 200) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };

        xhr.send(body);
    }

    whoami(callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://bubblerise-backend.herokuapp.com/api/users/me', true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (+xhr.status !== 200) {
                    return callback(xhr, null);
                }

                const response = JSON.parse(xhr.responseText);
                callback(null, response);
            };

            xhr.send();
    }
}
