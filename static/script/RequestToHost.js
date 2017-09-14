"use strict";

export default class RequestToHost {
    auth(login, password, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth', true);
        xhr.withCredentials = true; //for cookies

        const user = {login, password};
        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (+xhr.status !== 200) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };

        xhr.send(body);
    }

    reg(login, password, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/reg', true);
        xhr.withCredentials = true; //for cookies

        const user = {login, password};
        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
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
            xhr.open('GET', '/me', true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status !== 200) {
                    return callback(xhr, null);
                }

                const response = JSON.parse(xhr.responseText);
                callback(null, response);
            };

            xhr.send();
    }
}