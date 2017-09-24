"use strict";

import elementPresenter from "./elementPresenter.js";
import Validator from "./Validator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";
import {messagesLoginForm} from "./messages";

export default class LoginForm extends Validator {
    constructor() {
        super();
        this.logValue = "";
        this.pasValue = "";
        this.errBox = null;
        this.addEventsToButtons();
    }

    validate(logValue, pasValue, errorBox)
    {
        let log = this.correctLog(logValue);
        let pas = this.correctPas(pasValue);

        if (log === this.EMPTY || pas === this.EMPTY) {
            errorBox.innerHTML = messagesLoginForm.EMPTY_MESSAGE;
            return false;
        }

        if (log === this.INCORRECT || pas === this.INCORRECT) {
            errorBox.innerHTML = messagesLoginForm.INCORRECT_MESSAGE;
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    sendRequest() {
        const t = this;
        const reqUser = new RequestToHost();
        reqUser.auth(t.logValue, t.pasValue, function (err, resp) {
            if (err) {
                return t.errBox.innerHTML = messagesLoginForm.RESPONSE_MESSAGE;
            }

            alert("Вы вошли на сайт!");

            t.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");

            window.location.reload();
        })
    }

    addEventsToButtons() {
        const t = this;

        t.getElementByClass("login-form__button").addEventListener("click", function () {
            t.logValue = t.getElementByClass("login-form__input-login").value;
            t.pasValue = t.getElementByClass("login-form__input-password").value;
            t.errBox = t.getElementByClass("login-form__error-box");
            const valid = t.validate(t.logValue, t.pasValue, t.errBox);

            if (valid) {
                t.sendRequest();
            }
        });

        t.getElementByClass("login-page__button-back").addEventListener("click", function () {
            t.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");
        });

        t.getElementByClass("login-page__link-to-register").addEventListener("click", function () {
            t.clearFields("login-form__input-login", "login-form__input-password","login-form__error-box");
        });
    }
}
