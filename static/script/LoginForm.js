"use strict";

import FormValidator from "./FormValidator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";

export default class LoginForm extends FormValidator {
    constructor() {
        super();
        this.logValue = "";
        this.pasValue = "";
        this.errBox = null;
        this.addEventsToButtons();
    }

    static msgEmptyField() {
        return "Заполнены не все поля";
    }

    static msgIncorrectInput() {
        return "Использованы недопустимые символы";
    }

    static msgResponseFromHost() {
        return "Некорректный ввод или логин не существует";
    }

    validate(logValue, pasValue, errorBox)
    {
        let login = this.correctLogin(logValue);
        let password  = this.correctPassword(pasValue);

        if (login === this.EMPTY_RESPONSE || password  === this.EMPTY_RESPONSE) {
            errorBox.innerHTML = this.constructor.msgEmptyField();
            return false;
        }

        if (login === this.INCORRECT_RESPONSE || password  === this.INCORRECT_RESPONSE) {
            errorBox.innerHTML = this.constructor.msgIncorrectInput();
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    clearForm() {
        this.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");
    }

    sendRequest() {
        const reqUser = new RequestToHost();
        reqUser.auth(this.logValue, this.pasValue, (err, resp) => {
            if (err) {
                return this.errBox.innerHTML = this.constructor.msgResponseFromHost();
            }

            alert("Вы вошли на сайт!");
            this.clearForm();

            window.location.reload();
        })
    }

    addEventsToButtons() {
        this.getElementByClass("login-form__button").addEventListener("click", () => {
            this.logValue = this.getElementByClass("login-form__input-login").value;
            this.pasValue = this.getElementByClass("login-form__input-password").value;
            this.errBox = this.getElementByClass("login-form__error-box");
            const valid = this.validate(this.logValue, this.pasValue, this.errBox);

            if (valid) {
                this.sendRequest();
            }
        });

        this.getElementByClass("login-page__button-back").addEventListener("click", () => {this.clearForm()});
        this.getElementByClass("login-page__link-to-register").addEventListener("click", () => {this.clearForm()});
    }
}
