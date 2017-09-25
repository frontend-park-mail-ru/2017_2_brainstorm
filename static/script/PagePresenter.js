"use strict";

import elementPresenter from "./elementPresenter.js";
import Debugger from "./Debugger.js";
import Page from "./Page.js";
import whoamiMixin from "./whoamiMixin.js";

export default class PagePresenter {
    constructor() {

        let mainPage = new Page();
        Object.assign(mainPage, elementPresenter, whoamiMixin);
        mainPage.showOnlyOnePage("main-page");
        mainPage.addJumpToButton(
            {button: "main-menu__button-play", nextPage: "play-page"},
            {button: "main-menu__button-login", nextPage: "login-page"},
            {button: "main-menu__button-records", nextPage: "records-page"},
            {button: "main-menu__button-info", nextPage: "info-page"}
        );
        mainPage.whoami();

        let recordsPage = new Page();
        Object.assign(recordsPage, elementPresenter);
        recordsPage.addJumpToButton(
            {button: "records-page__button-back", nextPage: "main-page"}
        );

        let infoPage = new Page();
        Object.assign(infoPage, elementPresenter);
        infoPage.addJumpToButton(
            {button: "info-page__button-back", nextPage: "main-page"}
        );

        let playPage = new Page();
        Object.assign(playPage, elementPresenter);
        playPage.addJumpToButton(
            {button: "play-page__button-back", nextPage: "main-page"}
        );

        let loginPage = new Page();
        Object.assign(loginPage, elementPresenter);
        loginPage.addJumpToButton(
            {button: "login-page__button-back", nextPage: "main-page"},
            {button: "login-page__link-to-register", nextPage: "register-page"}
        );
        loginPage.constructor.workWithLoginForm();

        let registerPage = new Page();
        Object.assign(registerPage, elementPresenter);
        registerPage.addJumpToButton(
            {button: "register-page__button-back", nextPage: "login-page"},
            {button: "register-page__link-to-login", nextPage: "login-page"}
        );
        registerPage.constructor.workWithRegisterForm();
    }
}
