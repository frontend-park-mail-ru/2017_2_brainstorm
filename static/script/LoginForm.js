"use strict";

import FormValidator from "./FormValidator.js";
import RequestToHost from "./RequestToHost.js";
import fieldsCleaner from "./fieldsCleaner.js";

const messagesLoginForm = {
    EMPTY_MESSAGE : "Заполнены не все поля",
    INCORRECT_MESSAGE : "Использованы недопустимые символы",
    RESPONSE_MESSAGE : "Некорректный ввод или логина не существует",
    SUCCESS_SIGN_IN_MESSAGE : "Вы вошли на сайт!"
};

export default class LoginForm extends FormValidator {

    constructor() {
        super();
        Object.assign(LoginForm.prototype, /*elementGetter, */fieldsCleaner);
        this.loginValue = "";
        this.passwordValue = "";
        this.errorBox = null;
        this.addEventsToButtons();
    }

    static msgEmptyField() {
        return messagesLoginForm.EMPTY_MESSAGE;
    }

    static msgIncorrectInput() {
        return messagesLoginForm.INCORRECT_MESSAGE;
    }

    static msgResponseFromHost() {
        return messagesLoginForm.RESPONSE_MESSAGE;
    }

    static msgSignInSuccess() {
        return messagesLoginForm.SUCCESS_SIGN_IN_MESSAGE;
    }

    static validate(loginValue, passwordValue, errorBox)
    {
        let login = FormValidator.correctLogin(loginValue);
        let password  = FormValidator.correctPassword(passwordValue);

        if (login === FormValidator.responseEmpty() || password === FormValidator.responseEmpty()) {
            errorBox.innerHTML = LoginForm.msgEmptyField();
            return false;
        }

        if (login === FormValidator.responseIncorrect() || password  === FormValidator.responseIncorrect()) {
            errorBox.innerHTML = LoginForm.msgIncorrectInput();
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    clearForm() {
        this.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");
    }

    sendRequest() {
        RequestToHost.auth(this.loginValue, this.passwordValue, (err) => {
            if (err) {
                return this.errorBox.innerHTML = LoginForm.msgResponseFromHost();
            }

            alert(LoginForm.msgSignInSuccess());
            this.clearForm();

            window.location.reload();
        });
    }

    addEventsToButtons() {
        document.querySelector(".login-form__button").addEventListener("click", () => {
            this.loginValue = document.querySelector(".login-form__input-login").value;
            this.passwordValue = document.querySelector(".login-form__input-password").value;
            this.errorBox = document.querySelector(".login-form__error-box");
            const valid = LoginForm.validate(this.loginValue, this.passwordValue, this.errorBox);

            if (valid) {
                this.sendRequest();
            }
        });

        document.querySelector(".login-page__button-back").addEventListener("click", () => {this.clearForm();});
        document.querySelector(".login-page__link-to-register").addEventListener("click", () => {this.clearForm();});
    }
}
