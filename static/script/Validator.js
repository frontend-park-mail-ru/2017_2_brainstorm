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

        for (let i = 0; i < login.length; i++) {
            if (this.validData.indexOf(login[i]) === -1) {
                return this.INCORRECT;
            }
        }

        return this.OK;
    }

    correctPas(password) {
        if (password === "") {
            return this.EMPTY;
        }

        for (let i = 0; i < password.length; i++) {
            if (this.validData.indexOf(password[i]) === -1) {
                return this.INCORRECT;
            }
        }

        return this.OK;
    }

    correctEmail(email) {
        if (email === "") {
            return this.EMPTY;
        }

        if (email.indexOf("@") === -1)  {
            return this.NOT_EMAIL;
        }

        for (let i = 0; i < email.length; i++) {
            if (((this.validData + ".").indexOf(email[i]) === -1) && (email[i] !== "@")) {
                return this.INCORRECT;
            }
        }

        return this.OK;
    }
}
