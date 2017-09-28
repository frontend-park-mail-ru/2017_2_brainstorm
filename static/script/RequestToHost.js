"use strict";

const messagesFromHost = {
    HTTP_OK : 200,
    XHR_READY : 4
};

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
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
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
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    static auth(login, password, callback) {
        const user = {login, password};
        let response = RequestToHost.requestPost('api/users/signin', user, callback);
    }

    static register(login, password, email, callback) {
        const user = {login, password, email};
        let response = RequestToHost.requestPost('api/users', user, callback);
    }

    static whoami(callback) {
        let response = RequestToHost.requestGet('api/users/me', callback)
    }
}
