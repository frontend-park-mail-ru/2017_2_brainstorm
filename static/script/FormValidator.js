"use strict";

export default class FormValidator {

    static responseOk() {
        return "ok";
    }

    static responseEmpty() {
        return "empty";
    }

    static responseIncorrect() {
        return "incorrect";
    }

    static responseIsNotEmail() {
        return "is not email";
    }

    static correctLogin(login) {
        if (!login) {
            return FormValidator.responseEmpty();
        }
        const loginRegexp = /^[\w\d]{3,10}$/;
        return (loginRegexp.test(login)) ? FormValidator.responseOk() : FormValidator.responseIncorrect();
    }

    static correctPassword(password) {
        if (!password) {
            return FormValidator.responseEmpty();
        }
        const passwordRegexp = /\S{3,16}$/;
        return (passwordRegexp.test(password)) ? FormValidator.responseOk() : FormValidator.responseIncorrect();
    }

    static correctEmail(email) {
        if (!email) {
            return FormValidator.responseEmpty();
        }
        const emailRegexp = /^[.a-z0-9_-]+@[a-z0-9_.-]+\.[a-z]{2,6}$/;
        return (emailRegexp.test(email)) ? FormValidator.responseOk() : FormValidator.responseIsNotEmail();
    }
}
