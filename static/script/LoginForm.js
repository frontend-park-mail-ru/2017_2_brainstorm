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
        let login = this.correctLogin(logValue);
        let password  = this.correctPassword(pasValue);

        if (login === this.EMPTY_RESPONSE || password  === this.EMPTY_RESPONSE) {
            errorBox.innerHTML = messagesLoginForm.EMPTY_MESSAGE;
            return false;
        }

        if (login === this.INCORRECT_RESPONSE || password  === this.INCORRECT_RESPONSE) {
            errorBox.innerHTML = messagesLoginForm.INCORRECT_MESSAGE;
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    clearForm() {
        this.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");
    }

    sendRequest() {
        const t = this;
        const reqUser = new RequestToHost();
        reqUser.auth(t.logValue, t.pasValue, function (err, resp) {
            if (err) {
                return t.errBox.innerHTML = messagesLoginForm.RESPONSE_MESSAGE;
            }

            alert("Вы вошли на сайт!");
            t.clearForm();

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

        t.getElementByClass("login-page__button-back").addEventListener("click", () => {this.clearForm()});
        t.getElementByClass("login-page__link-to-register").addEventListener("click", () => {this.clearForm()});
    }
}
