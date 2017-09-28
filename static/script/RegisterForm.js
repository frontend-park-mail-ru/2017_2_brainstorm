"use strict";

import FormValidator from "./FormValidator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";
import elementPresenter from "./elementPresenter.js";
import fieldsCleaner from "./fieldsCleaner.js";

export default class RegisterForm extends FormValidator {

    constructor() {
        super();
        Object.assign(RegisterForm.prototype, elementPresenter, fieldsCleaner);
        this.emailValue = "";
        this.loginValue = "";
        this.passwordValue = "";
        this.errorBox = null;
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

    static msgSignUpSuccess() {
        return "Вы успешно зарегистрировались!";
    }

    static validate(loginValue, passwordValue, emailValue, errorBox)
    {
        let login = FormValidator.correctLogin(loginValue);
        let password = FormValidator.correctPassword(passwordValue);
        let email = FormValidator.correctEmail(emailValue);

        if (email === FormValidator.responseIsNotEmail()) {
            errorBox.innerHTML = RegisterForm.msgIsNotEmail();
            return false;
        }

        if (login === FormValidator.responseEmpty() || password === FormValidator.responseEmpty() || email === FormValidator.responseEmpty()) {
            errorBox.innerHTML = RegisterForm.msgEmptyField();
            return false;
        }

        if (login === FormValidator.responseIncorrect() || password === FormValidator.responseIncorrect()) {
            errorBox.innerHTML = RegisterForm.msgIncorrectInput();
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
        reqUser.reg(this.loginValue, this.passwordValue, this.emailValue, (err, resp) => {
            if (err) {
                return this.errorBox.innerHTML = RegisterForm.msgResponseFromHost();
            }

            alert(RegisterForm.msgSignUpSuccess());
            this.clearForm();

            this.getElementByClass("register-page__button-back").click();
        })
    }

    addEventsToButtons() {

        const t = this;

        this.getElementByClass("register-form__button").addEventListener("click", () => {
            this.emailValue = this.getElementByClass("register-form__input-email").value;
            this.loginValue = this.getElementByClass("register-form__input-login").value;
            this.passwordValue = this.getElementByClass("register-form__input-password").value;
            this.errorBox = this.getElementByClass("register-form__error-box");

            const valid = RegisterForm.validate(this.loginValue, this.passwordValue, this.emailValue, this.errorBox);

            if (valid) {
                this.sendRequest();
            }
        });

        this.getElementByClass("register-page__button-back").addEventListener("click", () => {this.clearForm()});
        this.getElementByClass("register-page__link-to-login").addEventListener("click", () => {this.clearForm()});
    }F
}
