"use strict";

import Page from "./Page.js";
import whoamiMixin from "./whoamiMixin.js";
import PagePresenter from "./PagePresenter.js";
import ThemeChanger from "./ThemeChanger.js";

import InfoPage from "../views/info-page/InfoPage.js";
import PlayPage from "../views/play-page/PlayPage.js";
import MultyPlayPage from "../views/multyplay-page/MultyPlayPage.js";
import MainPage from "../views/main-page/MainPage.js";
import LoginPage from "../views/login-page/LoginPage.js";
import RegisterPage from "../views/register-page/RegisterPage.js";
import RecordsPage from "../views/records-page/RecordsPage.js";
import MessageBox from "./MessageBox.js";
import TouchDelegater from "./TouchDelegater.js";

export default class Router {

    constructor() {

        const mainPagePath = MainPage.pagePath();
        const infoPagePath = InfoPage.pagePath();
        const playPagePath = PlayPage.pagePath();
        const multyPlayPagePath = MultyPlayPage.pagePath();
        const loginPagePath = LoginPage.pagePath();
        const registerPagePath = RegisterPage.pagePath();
        const recordsPagePath = RecordsPage.pagePath();

        this.themeChanger = new ThemeChanger();
        new MessageBox();

        Object.assign(Page.prototype, whoamiMixin);
        const mainPage = new MainPage();
        mainPage.whoami();
        // {button: "main-menu__button-play", nextPage: "play-page", pagePath: playPagePath},
        mainPage.addRedirectOnButtons(
            {button: "message-box__multyplay-button", nextPage: "multyplay-page", pagePath: multyPlayPagePath},
            {button: "message-box__singleplay-button", nextPage: "play-page", pagePath: playPagePath},
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
            {button: "panel__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        this.multyPlayPage = new MultyPlayPage();
        this.multyPlayPage.addRedirectOnButtons(
            {button: "multypanel__button-back", nextPage: "main-page", pagePath: mainPagePath}
        );

        this.loginPage = new LoginPage();
        const registerPage = new RegisterPage();

        this.loginPage.addRedirectOnButtons(
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

        new TouchDelegater();
        this.redirectToPage();

        window.addEventListener("popstate", () => {
            this.redirectToPage();
            registerPage.getForm().clearForm();
            this.loginPage.getForm().clearForm();
        });
    }

    getMe(router) {
        this.myRouter = router;
    }

    sendRouter() {
        this.loginPage.takeRouter(this.myRouter);
    }

    changeTheme() {
        this.themeChanger.sendRequestForTheme();
    }

    redirectToPage() {
        const pathname = window.location.pathname;
        let gameMode = (pathname === "/play");
        this.playPage.gameMode(gameMode);
        let multyGameMode = (pathname === "/multyplay");
        this.multyPlayPage.gameMode(multyGameMode);
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

        case "/multyplay":
            PagePresenter.showOnlyOnePage("multyplay-page");
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
