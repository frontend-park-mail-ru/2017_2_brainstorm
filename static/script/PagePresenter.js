"use strict";

import elementPresenter from "./elementPresenter.js";
import Debugger from "./Debugger.js";
import Page from "./Page.js";
import whoamiMixin from "./whoamiMixin.js";

import RecordsPage from "./RecordsPage.js";
import InfoPage from "./InfoPage.js";
import PlayPage from "./PlayPage";
import MainPage from "./MainPage.js";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default class PagePresenter {
    constructor() {

        Object.assign(Page.prototype, elementPresenter, whoamiMixin);
        let mainPage = new MainPage();
        mainPage.showOnlyOnePage("main-page");
        mainPage.addEventsOnButtons();
        mainPage.whoami();

        let recordsPage = new RecordsPage();

        let infoPage = new InfoPage();

        let playPage = new PlayPage();

        let loginPage = new LoginPage();

        let registerPage = new RegisterPage();
    }
}
