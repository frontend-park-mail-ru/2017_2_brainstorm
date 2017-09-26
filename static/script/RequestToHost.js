"use strict";

const HTTP_OK = 200;

export default class RequestToHost {

    static baseUrl() {
        return  'https://bubblerise-backend.herokuapp.com/';
    };

    static requestPost(address, user, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.baseUrl() + address, true);
        xhr.withCredentials = true; //for cookies

        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.send(body);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (+xhr.status !== HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    static requestGet(address, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.baseUrl() + address, true);
        xhr.withCredentials = true;

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (+xhr.status !== HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    auth(login, password, callback) {
        const user = {login, password};
        let response = this.constructor.requestPost('api/users/signin', user, callback);
    }

    reg(login, password, email, callback) {
        const user = {login, password, email};
        let response = this.constructor.requestPost('api/users', user, callback);
    }

    whoami(callback) {
        let response = this.constructor.requestGet('api/users/me', callback)
    }
}
