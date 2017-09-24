"use strict";

import elementPresenter from "./elementPresenter.js";
import Validator from "./Validator.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";

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
        let log = this.correctLog(logValue);
        let pas = this.correctPas(pasValue);
        let email = this.correctEmail(emailValue);

        if (log === this.EMPTY || pas === this.EMPTY || email === this.EMPTY) {
            errorBox.innerHTML = "Заполнены не все поля";
            return false;
        }

        if (log === this.INCORRECT || pas === this.INCORRECT) {
            errorBox.innerHTML = "Использованы недопустимые символы";
            return false;
        }

        if (email === this.NOT_EMAIL) {
            errorBox.innerHTML = "Некорректный email";
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    sendRequest() {
        const t = this;
        const reqUser = new RequestToHost();
        reqUser.reg(t.logValue, t.pasValue, t.emailValue, function (err, resp) {
            if (err) {
                return t.errBox.innerHTML = "Некорректный ввод или логин уже существует";
            }

            alert("Вы успешно зарегистрировались!");

            t.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password", "register-form__error-box");

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

        t.getElementByClass("register-page__button-back").addEventListener("click", function () {
            t.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password", "register-form__error-box");
        });

        t.getElementByClass("register-page__link-to-login").addEventListener("click", function () {
            t.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password","register-form__error-box");
        });
    }
}
