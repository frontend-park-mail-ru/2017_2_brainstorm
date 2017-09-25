"use strict";

export default class FormValidator {

    constructor() {
        this.OK_RESPONSE = "ok";
        this.EMPTY_RESPONSE = "empty";
        this.INCORRECT_RESPONSE = "incorrect";
        this.NOT_EMAIL_RESPONSE = "is not email";
    }

    static responseOk() {
        return "ok";
    }

    correctLogin(login) {
        if (!login) {
            return this.EMPTY_RESPONSE;
        }
        const loginRegexp = /^[\w\d]{3,10}$/;
        return (loginRegexp.test(login)) ? this.OK_RESPONSE : this.INCORRECT_RESPONSE;
    }

    correctPassword(password) {
        if (!password) {
            return this.EMPTY_RESPONSE;
        }
        const passwordRegexp = /\S{3,16}$/;
        return (passwordRegexp.test(password)) ? this.OK_RESPONSE : this.INCORRECT_RESPONSE;
    }

    correctEmail(email) {
        if (!email) {
            return this.EMPTY_RESPONSE;
        }
        const emailRegexp = /^[.a-z0-9_-]+@[a-z0-9_.-]+\.[a-z]{2,6}$/;
        return (emailRegexp.test(email)) ? this.OK_RESPONSE : this.NOT_EMAIL_RESPONSE;
    }
}
