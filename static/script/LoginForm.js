"use strict";

import FormValidator from "./FormValidator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";
import elementPresenter from "./elementPresenter.js";
import fieldsCleaner from "./fieldsCleaner.js";

export default class LoginForm extends FormValidator {

    constructor() {
        super();
        Object.assign(LoginForm.prototype, elementPresenter, fieldsCleaner);
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

    static msgSignInSuccess() {
        return "Вы вошли на сайт!";
    }

    validate(logValue, pasValue, errorBox)
    {
        let login = FormValidator.correctLogin(logValue);
        let password  = FormValidator.correctPassword(pasValue);

        if (login === FormValidator.responseEmpty()|| password  === FormValidator.responseEmpty()) {
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
        const reqUser = new RequestToHost();
        reqUser.auth(this.logValue, this.pasValue, (err, resp) => {
            if (err) {
                return this.errBox.innerHTML = LoginForm.msgResponseFromHost();
            }

            alert(LoginForm.msgSignInSuccess());
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
