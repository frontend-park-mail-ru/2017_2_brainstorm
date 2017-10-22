"use strict";

import Page from "./Page.js";
import whoamiMixin from "./whoamiMixin.js";
import PagePresenter from "./PagePresenter.js";
import ThemeChanger from "./ThemeChanger.js"

import InfoPage from "../views/info-page/InfoPage.js";
import PlayPage from "../views/play-page/PlayPage";
import MainPage from "../views/main-page/MainPage.js";
import LoginPage from "../views/login-page/LoginPage";
import RegisterPage from "../views/register-page/RegisterPage";
import RecordsPage from "../views/records-page/RecordsPage";

export default class Router {

    constructor() {

        const mainPagePath = MainPage.pagePath();
        const infoPagePath = InfoPage.pagePath();
        const playPagePath = PlayPage.pagePath();
        const loginPagePath = LoginPage.pagePath();
        const registerPagePath = RegisterPage.pagePath();
        const recordsPagePath = RecordsPage.pagePath();

        new ThemeChanger();

        Object.assign(Page.prototype, whoamiMixin);
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

        this.playPage = new PlayPage();
        this.playPage.addRedirectOnButtons(
            {button: "play-page__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        const loginPage = new LoginPage();
        const registerPage = new RegisterPage();

        loginPage.addRedirectOnButtons(
            {button: "login-page__button-back", nextPage: "main-page", pagePath: mainPagePath},
            {button: "login-page__link-to-register", nextPage: "register-page", pagePath: registerPagePath}
        );

        registerPage.addRedirectOnButtons(
            {button: "register-page__button-back", nextPage: "login-page", pagePath: loginPagePath},
            {button: "register-page__link-to-login", nextPage: "login-page", pagePath: loginPagePath}
        );

        this.recordsPage = new RecordsPage();
        this.recordsPage.addRedirectOnButtons(
            {button: "records-page__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        this.redirectToPage();

        window.addEventListener("popstate", () => {
            this.redirectToPage();
            registerPage.getForm().clearForm();
            loginPage.getForm().clearForm();
        });
    }

    redirectToPage() {
        const pathname = window.location.pathname;
        let gameMode = (pathname === "/play");
        this.playPage.gameMode(gameMode);
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
            this.recordsPage.sendRequestForRecords();
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
