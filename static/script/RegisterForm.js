"use strict";

import FormValidator from "./FormValidator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";

export default class RegisterForm extends FormValidator {
    constructor() {
        super();
        this.emailValue = "";
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
        return "Некорректный ввод или логин уже существует";
    }

    static msgIsNotEmail() {
        return "Некорректный email";
    }

    validate(logValue, pasValue, emailValue, errorBox)
    {
        let login = this.correctLogin(logValue);
        let password = this.correctPassword(pasValue);
        let email = this.correctEmail(emailValue);

        if (email === this.NOT_EMAIL_RESPONSE) {
            errorBox.innerHTML = this.constructor.msgIsNotEmail();
            return false;
        }

        if (login === this.EMPTY_RESPONSE || password === this.EMPTY_RESPONSE || email === this.EMPTY_RESPONSE) {
            errorBox.innerHTML = this.constructor.msgEmptyField();
            return false;
        }

        if (login === this.INCORRECT_RESPONSE || password === this.INCORRECT_RESPONSE) {
            errorBox.innerHTML = this.constructor.msgIncorrectInput();
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    clearForm() {
        this.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password", "register-form__error-box");
    }

    sendRequest() {
        const reqUser = new RequestToHost();
        reqUser.reg(this.logValue, this.pasValue, this.emailValue, (err, resp) => {
            if (err) {
                return this.errBox.innerHTML = this.constructor.msgResponseFromHost();
            }

            alert("Вы успешно зарегистрировались!");
            this.clearForm();

            this.getElementByClass("register-page__button-back").click();
        })
    }

    addEventsToButtons() {

        const t = this;

        this.getElementByClass("register-form__button").addEventListener("click", () => {
            this.emailValue = this.getElementByClass("register-form__input-email").value;
            this.logValue = this.getElementByClass("register-form__input-login").value;
            this.pasValue = this.getElementByClass("register-form__input-password").value;
            this.errBox = this.getElementByClass("register-form__error-box");

            const valid = this.validate(this.logValue, this.pasValue, this.emailValue, this.errBox);

            if (valid) {
                this.sendRequest();
            }
        });

        this.getElementByClass("register-page__button-back").addEventListener("click", () => {this.clearForm()});
        this.getElementByClass("register-page__link-to-login").addEventListener("click", () => {this.clearForm()});
    }
}
