"use strict";

import elementPresenter from "./elementPresenter.js";
import CorrectLoginPassword from "./CorrectLoginPassword.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger.js";

export default class PagePresenter {
    constructor() {
        this.addEventToMainPageButtons();
        this.addEventToLoginPageButtons();
        this.addEventToRegisterPageButtons();
        this.addEventToRecordsPageButtons();
        this.addEventToPlayPageButtons();
        this.addEventToInfoPageButtons();
        this.showOnlyOnePage("main-page");
        this.clearInputFields();
        this.clearBoxFields();
    }

    static hideAllPages() {
        let pages = document.getElementsByClassName("page");
        for (let i = 0; i < pages.length; i++) {
            pages[i].hidden = true;
        }
    }

    showOnlyOnePage(pageName) {
        this.constructor.hideAllPages();
        this.getElementByClass(pageName.toString()).hidden = false;
    }

    addEventToMainPageButtons() {
        const t = this;

        const objReqUser = new RequestToHost();
        objReqUser.whoami(function (err, resp) {
            const logBox = t.getElementByClass("main-page__user");
            if (err) {
                return logBox.innerHTML = "Привет, Гость!";
            }

            logBox.innerHTML = "Привет, " + resp.login + "!";
        });

        this.getElementByClass("main-menu__button-play").addEventListener("click", function(){
            t.showOnlyOnePage("play-page");
        });

        this.getElementByClass("main-menu__button-login").addEventListener("click", function(){
            t.showOnlyOnePage("login-page");
        });

        this.getElementByClass("main-menu__button-records").addEventListener("click", function(){
            t.showOnlyOnePage("records-page");
        });

        this.getElementByClass("main-menu__button-info").addEventListener("click", function(){
            t.showOnlyOnePage("info-page");
        });
    }

    addEventToLoginPageButtons() {
        const t = this;

        this.getElementByClass("login-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new CorrectLoginPassword();
            let logValue = t.getElementByClass("login-form__input-login").value;
            let pasValue = t.getElementByClass("login-form__input-password").value;
            let errBox = t.getElementByClass("login-form__error-box");

            const valid = objCorrectLogPas.correctForm(logValue, pasValue, errBox);

            if (valid) {
                const objReqUser = new RequestToHost();
                objReqUser.auth(logValue,pasValue,function (err, resp) {
                    if (err) {
                        return errBox.innerHTML = "Некорректный ввод или логин не существует";
                    }

                    alert("Вы вошли на сайт!");

                    t.clearInputFields("login-form__input-login", "login-form__input-password");
                    t.clearBoxFields("login-form__error-box");

                    window.location.reload();
                })
            }
        });

        this.getElementByClass("login-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");

            t.clearInputFields("login-form__input-login", "login-form__input-password");
            t.clearBoxFields("login-form__error-box");
        });

        this.getElementByClass("login-page__link-to-register").addEventListener("click", function () {
            t.showOnlyOnePage("register-page");

            t.clearInputFields("login-form__input-login", "login-form__input-password");
            t.clearBoxFields("login-form__error-box");
        });
    }

    addEventToRegisterPageButtons() {
        const t = this;

        this.getElementByClass("register-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new CorrectLoginPassword();
            let logValue = t.getElementByClass("register-form__input-login").value;
            let pasValue = t.getElementByClass("register-form__input-password").value;
            let errBox = t.getElementByClass("register-form__error-box");

            const valid = objCorrectLogPas.correctForm(logValue, pasValue, errBox);

            if (valid) {
                const objReqUser = new RequestToHost();
                objReqUser.reg(logValue,pasValue,function (err, resp) {
                    if (err) {
                        return errBox.innerHTML = "Некорректный ввод или логин уже существует";
                    }

                    alert("Вы успешно зарегистрировались!");

                    t.clearInputFields("register-form__input-login", "register-form__input-password");
                    t.clearBoxFields("register-form__error-box");

                    t.getElementByClass("register-page__button-back").click();
                })
            }
        });

        this.getElementByClass("register-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");

            t.clearInputFields("register-form__input-login", "register-form__input-password");
            t.clearBoxFields("register-form__error-box");
        });

        this.getElementByClass("register-page__link-to-login").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");

            t.clearInputFields("register-form__input-login", "register-form__input-password");
            t.clearBoxFields("register-form__error-box");
        });
    }

    addEventToRecordsPageButtons() {
        const t = this;

        this.getElementByClass("records-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    addEventToPlayPageButtons() {
        const t = this;

        this.getElementByClass("play-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    addEventToInfoPageButtons() {
        const t = this;

        this.getElementByClass("info-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    clearInputFields(...fields) {
        const t = this;
        for (let i = 0; i < fields.length; i++) {
            t.getElementByClass(fields[i].toString()).value = "";
        }
    }

    clearBoxFields(...fields) {
        const t = this;
        for (let i = 0; i < fields.length; i++) {
            t.getElementByClass(fields[i].toString()).innerHTML = "";
        }
    }
}
