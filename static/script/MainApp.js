"use strict";

import elementReturner from "./elementReturner.js";
import PagePresenter from "./PagePresenter.js";
import Debugger from "./Debugger.js";

class MainApp {

    constructor () {
        Debugger.print("Application was created");
        Object.assign(PagePresenter.prototype, elementReturner);
        let pagePresenter = new PagePresenter();
    }
}

window.addEventListener("load", function () {
    const application = new MainApp();
});
