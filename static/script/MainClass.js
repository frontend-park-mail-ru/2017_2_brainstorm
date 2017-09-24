"use strict";

import elementPresenter from "./elementPresenter.js";
import PagePresenter from "./PagePresenter.js";
import Validator from "./Validator.js";
import whoamiMixin from "./whoamiMixin.js";

class MainClass {
    constructor () {
        Object.assign(PagePresenter.prototype, elementPresenter);
        let pagePresenter = new PagePresenter();
    }
}

window.addEventListener("load", function () {
    const objMain = new MainClass();
});
