"use strict";

import elementGetter from "./elementGetter.js";
import Page from "./Page.js";
import whoamiMixin from "./whoamiMixin.js";

import InfoPage from "./InfoPage.js";
import PlayPage from "./PlayPage";
import MainPage from "./MainPage.js";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RecordsPage from "./RecordsPage";

export default class PagePresenter {

    constructor() {

        Object.assign(Page.prototype, elementGetter, whoamiMixin);
        const mainPage = new MainPage();
        mainPage.showOnlyOnePage("main-page");
        mainPage.addEventsOnButtons();
        mainPage.whoami();

        new InfoPage();

        new PlayPage();

        new LoginPage();

        new RegisterPage();

        new RecordsPage();
    }
}
