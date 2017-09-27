"use strict";

import elementPresenter from "./elementPresenter.js";
import PagePresenter from "./PagePresenter.js";

class MainApp {

    constructor () {
        Object.assign(PagePresenter.prototype, elementPresenter);
        let pagePresenter = new PagePresenter();
    }
}

window.addEventListener("load", function () {
    const application = new MainApp();
});
