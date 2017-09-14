"use strict";

import GetElem from "./GetElem.js";
import CorrectLoginPassword from "./CorrectLoginPassword.js";
import RequestToHost from "./RequestToHost.js";

export default class AddEvent {
    constructor() {
        this.addEventToMainPageButtons();
        this.addEventToLoginPageButtons();
        this.addEventToRegisterPageButtons();
        this.addEventToRecordsPageButtons();
        this.addEventToPlayPageButtons();
        this.addEventToInfoPageButtons();
        this.showOnlyOnePage("main-page");
    }

    hideAllPages() {
        document.getElementsByClassName('main-page')[0].hidden = true;
        document.getElementsByClassName('register-page')[0].hidden = true;
        document.getElementsByClassName('records-page')[0].hidden = true;
        document.getElementsByClassName('login-page')[0].hidden = true;
        document.getElementsByClassName('play-page')[0].hidden = true;
        document.getElementsByClassName('info-page')[0].hidden = true;
    }

    showOnlyOnePage(pageName) {
        this.hideAllPages();
        document.getElementsByClassName(pageName.toString())[0].hidden = false;
    }

    addEventToMainPageButtons() {
        const objGetElem = new GetElem();
        const t = this;

        const objReqUser = new RequestToHost();
        objReqUser.whoami(function (err, resp) {
            const logBox = objGetElem.getEl("main-page__user");
            if (err) {
                return logBox.innerHTML = "Привет, Гость!";
            }

            logBox.innerHTML = "Привет, " + resp.login + "!";
        });

        objGetElem.getEl("main-menu__button-play").addEventListener("click", function(){
            t.showOnlyOnePage("play-page");
        });

        objGetElem.getEl("main-menu__button-login").addEventListener("click", function(){
            t.showOnlyOnePage("login-page");
        });

        objGetElem.getEl("main-menu__button-records").addEventListener("click", function(){
            t.showOnlyOnePage("records-page");
        });

        objGetElem.getEl("main-menu__button-info").addEventListener("click", function(){
            t.showOnlyOnePage("info-page");
            t.showOnlyOnePage("info-page");
        });
    }

    addEventToLoginPageButtons() {
        const t = this;
        const objGetElem = new GetElem();

        objGetElem.getEl("login-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new CorrectLoginPassword();
            let logValue = objGetElem.getEl("login-form__input-login").value;
            let pasValue = objGetElem.getEl("login-form__input-password").value;
            let errBox = objGetElem.getEl("login-form__error-box");

            const valid = objCorrectLogPas.correctForm(logValue, pasValue, errBox);

            if (valid) {
                const objReqUser = new RequestToHost();
                objReqUser.auth(logValue,pasValue,function (err, resp) {
                    if (err) {
                        return errBox.innerHTML = "Некорректный ввод или логин не существует";
                    }

                    alert("Вы вошли на сайт!");

                    objGetElem.getEl("login-form__input-login").value = "";
                    objGetElem.getEl("login-form__input-password").value = "";
                    objGetElem.getEl("login-form__error-box").innerHTML = "";

                    window.location.reload();
                })
            }
        });

        objGetElem.getEl("login-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });

        objGetElem.getEl("login-page__link-to-register").addEventListener("click", function () {
            t.showOnlyOnePage("register-page");

            objGetElem.getEl("login-form__input-login").value = "";
            objGetElem.getEl("login-form__input-password").value = "";
            objGetElem.getEl("login-form__error-box").innerHTML = "";
        });
    }

    addEventToRegisterPageButtons() {
        const t = this;
        const objGetElem = new GetElem();

        objGetElem.getEl("register-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new CorrectLoginPassword();
            let logValue = objGetElem.getEl("register-form__input-login").value;
            let pasValue = objGetElem.getEl("register-form__input-password").value;
            let errBox = objGetElem.getEl("register-form__error-box");

            const valid = objCorrectLogPas.correctForm(logValue, pasValue, errBox);

            if (valid) {
                const objReqUser = new RequestToHost();
                objReqUser.reg(logValue,pasValue,function (err, resp) {
                    if (err) {
                        return errBox.innerHTML = "Некорректный ввод или логин уже существует";
                    }

                    alert("Вы успешно зарегистрировались!");

                    objGetElem.getEl("register-form__input-login").value = "";
                    objGetElem.getEl("register-form__input-password").value = "";
                    objGetElem.getEl("register-form__error-box").innerHTML = "";

                    objGetElem.getEl("register-page__button-back").click();
                })
            }
        });

        objGetElem.getEl("register-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");
        });

        objGetElem.getEl("register-page__link-to-login").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");

            objGetElem.getEl("register-form__input-login").value = "";
            objGetElem.getEl("register-form__input-password").value = "";
            objGetElem.getEl("register-form__error-box").innerHTML = "";
        });
    }

    addEventToRecordsPageButtons() {
        const t = this;
        const objGetElem = new GetElem();

        objGetElem.getEl("records-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    addEventToPlayPageButtons() {
        const t = this;
        const objGetElem = new GetElem();

        objGetElem.getEl("play-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    addEventToInfoPageButtons() {
        const t = this;
        const objGetElem = new GetElem();

        objGetElem.getEl("info-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }
}