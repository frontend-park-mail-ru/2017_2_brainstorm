"use strict";

export default class ValidatorLoginPasswordEmail {

    constructor() {
        this.OK_RESPONSE = "ok";
        this.EMPTY_RESPONSE = "empty";
        this.INCORRECT_RESPONSE = "incorrect";
        this.NOT_EMAIL_RESPONSE = "is not email";
    }

    correctLogin(login) {
        if (!login) {
            return this.EMPTY_RESPONSE;
        }
        const loginRegexp = /^[a-zA-Z][a-zA-Z0-9]{3,10}/;
        return (loginRegexp.test(login)) ? this.OK_RESPONSE : this.INCORRECT_RESPONSE;
    }

    correctPassword(password) {
        if (!password) {
            return this.EMPTY_RESPONSE;
        }
        const passwordRegexp = /\S{3,16}/;
        return (passwordRegexp.test(password)) ? this.OK_RESPONSE : this.INCORRECT_RESPONSE;
    }

    correctEmail(email) {
        if (!email) {
            return this.EMPTY_RESPONSE;
        }
        const emailRegexp = /^[.a-z0-9_-]+@[a-z0-9_-]+\.([a-z]{2,6})+$/;
        return (emailRegexp.test(email)) ? this.OK_RESPONSE : this.NOT_EMAIL_RESPONSE;
    }
}
