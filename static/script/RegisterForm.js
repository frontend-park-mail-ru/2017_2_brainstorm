"use strict";

import FormValidator from "./FormValidator.js";
import RequestToHost from "./RequestToHost.js";
import fieldsCleaner from "./fieldsCleaner.js";

const messagesRegisterForm = {
    EMPTY_MESSAGE : "Заполнены не все поля",
    INCORRECT_MESSAGE : "Использованы недопустимые символы",
    NOT_EMAIL_MESSAGE : "Некорректный email",
    RESPONSE_MESSAGE : "Некорректный ввод или логин уже существует",
    SUCCESS_SIGN_UP_MESSAGE : "Вы успешо зарегистрировались!"
};

export default class RegisterForm extends FormValidator {

    constructor() {
        super();
        Object.assign(RegisterForm.prototype, fieldsCleaner);
        this.emailValue = "";
        this.loginValue = "";
        this.passwordValue = "";
        this.errorBox = null;
        this.addEventsToButtons();
    }

    static msgEmptyField() {
        return messagesRegisterForm.EMPTY_MESSAGE;
    }

    static msgIncorrectInput() {
        return messagesRegisterForm.INCORRECT_MESSAGE;
    }

    static msgResponseFromHost() {
        return messagesRegisterForm.RESPONSE_MESSAGE;
    }

    static msgIsNotEmail() {
        return messagesRegisterForm.NOT_EMAIL_MESSAGE;
    }

    static msgSignUpSuccess() {
        return messagesRegisterForm.SUCCESS_SIGN_UP_MESSAGE;
    }

    static validate(loginValue, passwordValue, emailValue, errorBox) {
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
        RequestToHost.register(this.loginValue, this.passwordValue, this.emailValue, (err) => {
            if (err) {
                return this.errorBox.innerHTML = RegisterForm.msgResponseFromHost();
            }

            alert(RegisterForm.msgSignUpSuccess());
            this.clearForm();

            document.querySelector(".register-page__button-back").click();
        });
    }

    addEventsToButtons() {

        document.querySelector(".register-form__button").addEventListener("click", () => {
            this.emailValue = document.querySelector(".register-form__input-email").value;
            this.loginValue = document.querySelector(".register-form__input-login").value;
            this.passwordValue = document.querySelector(".register-form__input-password").value;
            this.errorBox = document.querySelector(".register-form__error-box");

            const valid = RegisterForm.validate(this.loginValue, this.passwordValue, this.emailValue, this.errorBox);

            if (valid) {
                this.sendRequest();
            }
        });

        document.querySelector(".register-page__button-back").addEventListener("click", () => {this.clearForm();});
        document.querySelector(".register-page__link-to-login").addEventListener("click", () => {this.clearForm();});
    }
}
