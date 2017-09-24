"use strict";

export default class CorrectLoginPassword {

    constructor() {
        this.OK = "ok";
        this.EMPTY = "empty";
        this.INCORRECT = "incorrect";
        this.NOT_EMAIL = "is not email";

        this.validData = 'abcdefghijklmnopqrstuvwxyz';
        this.validData += this.validData.toUpperCase() + '1234567890';
    }

    correctLog(login) {
        if (login==="") {
            return this.EMPTY;
        }
        if (/^[a-zA-Z][a-zA-Z0-9]{3,10}/.test(login)) {
            return this.OK
        } else {
            return this.INCORRECT;
        }
    }

    correctPas(password) {
        if (password === "") {
            return this.EMPTY;
        }
        if (/^[a-z0-9]{3,16}$/i.test(password)) {
            return this.OK
        } else {
            return this.INCORRECT;
        }
    }

    correctEmail(email) {
        if (email === "") {
            return this.EMPTY;
        }
        if (/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i.test(email)) {
            return this.OK
        } else {
            return this.NOT_EMAIL;
        }
    }
}
