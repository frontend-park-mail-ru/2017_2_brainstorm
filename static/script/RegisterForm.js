"use strict";

import elementPresenter from "./elementPresenter.js";
import Validator from "./Validator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";
import {messagesRegisterForm} from "./messages";

export default class RegisterForm extends Validator {
    constructor() {
        super();
        this.emailValue = "";
        this.logValue = "";
        this.pasValue = "";
        this.errBox = null;
        this.addEventsToButtons();
    }

    validate(logValue, pasValue, emailValue, errorBox)
    {
        let login = this.correctLogin(logValue);
        let password = this.correctPassword(pasValue);
        let email = this.correctEmail(emailValue);

        if (login === this.EMPTY_RESPONSE || password === this.EMPTY_RESPONSE || email === this.EMPTY_RESPONSE) {
            errorBox.innerHTML = messagesRegisterForm.EMPTY_MESSAGE;
            return false;
        }

        if (login === this.INCORRECT_RESPONSE || password === this.INCORRECT_RESPONSE) {
            errorBox.innerHTML = messagesRegisterForm.INCORRECT_MESSAGE;
            return false;
        }

        if (email === this.NOT_EMAIL_RESPONSE) {
            errorBox.innerHTML = messagesRegisterForm.NOT_EMAIL_MESSAGE;
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    clearForm() {
        this.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password", "register-form__error-box");
    }

    sendRequest() {
        const t = this;
        const reqUser = new RequestToHost();
        reqUser.reg(t.logValue, t.pasValue, t.emailValue, function (err, resp) {
            if (err) {
                return t.errBox.innerHTML = messagesRegisterForm.RESPONSE_MESSAGE;
            }

            alert("Вы успешно зарегистрировались!");
            t.clearForm();

            t.getElementByClass("register-page__button-back").click();
        })
    }

    addEventsToButtons() {

        const t = this;

        this.getElementByClass("register-form__button").addEventListener("click", function(){
            t.emailValue = t.getElementByClass("register-form__input-email").value;
            t.logValue = t.getElementByClass("register-form__input-login").value;
            t.pasValue = t.getElementByClass("register-form__input-password").value;
            t.errBox = t.getElementByClass("register-form__error-box");

            const valid = t.validate(t.logValue, t.pasValue, t.emailValue, t.errBox);

            if (valid) {
                t.sendRequest();
            }
        });

        t.getElementByClass("register-page__button-back").addEventListener("click", () => {this.clearForm()});
        t.getElementByClass("register-page__link-to-login").addEventListener("click", () => {this.clearForm()});
    }
}
