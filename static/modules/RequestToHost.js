"use strict";

const messagesFromHost = {
    HTTP_OK : 200,
    XHR_READY : 4
};

/**
 * Класс для запросов на сервер
 */
export default class RequestToHost {

    /**
	 * Возвращает url backend сервера
     * @returns {string}
     */
    static baseUrl() {
        // return  "https://bubblerise-backend.herokuapp.com/";
        // для тестирования взаимодействия с сервером на localhost
        return  "http://localhost:8080/";
    }

    /**
	 * POST-запрос на сервер
     * @param {string} address
     * @param {string} user
     * @param callback
     */
    static requestPost(address, user, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", this.baseUrl() + address, true);
        xhr.withCredentials = true; //for cookies

        const body = JSON.stringify(user);

        xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");

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

    /**
	 * GET-запрос на сервер
     * @param {string} address - string with url
     * @param callback
     */
    static requestGet(address, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.baseUrl() + address, true);
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

    /**
	 * Авторизация пользователя
     * @param login
     * @param password
     * @param callback
     */
    static auth(login, password, callback) {
        const user = {login, password};
        RequestToHost.requestPost("api/users/signin", user, callback);
    }

    /**
	 * Регистрация пользователя
     * @param login
     * @param password
     * @param email
     * @param callback
     */
    static register(login, password, email, callback) {
        const user = {login, password, email};
        RequestToHost.requestPost("api/users", user, callback);
    }

    /**
	 * Узнает информацию о текущем пользователе
     * @param callback
     */
    static whoami(callback) {
        RequestToHost.requestGet("api/users/me", callback);
    }

    /**
	 * Запрашивает TOP пользователей
     * @param callback
     */
    static records(callback) {
        RequestToHost.requestGet("api/users/records", callback);
    }
}
