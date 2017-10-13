"use strict";

import Page from "./Page.js";
import whoamiMixin from "./whoamiMixin.js";
import PagePresenter from "./PagePresenter.js";

import InfoPage from "./InfoPage.js";
import PlayPage from "./PlayPage";
import MainPage from "./MainPage.js";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RecordsPage from "../views/records-page/RecordsPage";

export default class Router {

    constructor() {

        const mainPagePath = MainPage.pagePath();
        const infoPagePath = InfoPage.pagePath();
        const playPagePath = PlayPage.pagePath();
        const loginPagePath = LoginPage.pagePath();
        const registerPagePath = RegisterPage.pagePath();
        const recordsPagePath = RecordsPage.pagePath();

        this.redirectToPage();

        Object.assign(Page.prototype, /*elementGetter, */whoamiMixin);
        const mainPage = new MainPage();
        mainPage.whoami();
        mainPage.addRedirectOnButtons(
            {button: "main-menu__button-play", nextPage: "play-page", pagePath: playPagePath},
            {button: "main-menu__button-login", nextPage: "login-page", pagePath: loginPagePath},
            {button: "main-menu__button-records", nextPage: "records-page", pagePath: recordsPagePath},
            {button: "main-menu__button-info", nextPage: "info-page", pagePath: infoPagePath}
        );

        const infoPage = new InfoPage();
        infoPage.addRedirectOnButtons(
            {button: "info-page__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        const playPage = new PlayPage();
        playPage.addRedirectOnButtons(
            {button: "play-page__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        const loginPage = new LoginPage();
        loginPage.addRedirectOnButtons(
            {button: "login-page__button-back", nextPage: "main-page", pagePath: mainPagePath},
            {button: "login-page__link-to-register", nextPage: "register-page", pagePath: registerPagePath}
        );

        const registerPage = new RegisterPage();
        registerPage.addRedirectOnButtons(
            {button: "register-page__button-back", nextPage: "login-page", pagePath: loginPagePath},
            {button: "register-page__link-to-login", nextPage: "login-page", pagePath: loginPagePath}
        );

        this.recordsPage = new RecordsPage();
        this.recordsPage.addRedirectOnButtons(
            {button: "records-page__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        window.addEventListener("popstate", () => {
            this.redirectToPage();
            registerPage.getForm().clearForm();
            loginPage.getForm().clearForm();
        });
    }

    redirectToPage() {
        const pathname = window.location.pathname;
        switch (pathname) {
        case "/main":
            PagePresenter.showOnlyOnePage("main-page");
            break;

        case "/register":
            PagePresenter.showOnlyOnePage("register-page");
            break;

        case "/login":
            PagePresenter.showOnlyOnePage("login-page");
            break;

        case "/play":
            PagePresenter.showOnlyOnePage("play-page");
            break;

        case "/records":
            new RecordsPage();
            PagePresenter.showOnlyOnePage("records-page");
            break;

        case "/info":
            PagePresenter.showOnlyOnePage("info-page");
            break;
        default:
            PagePresenter.showOnlyOnePage("main-page");
            break;
        }
    }
}
