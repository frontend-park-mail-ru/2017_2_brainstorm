"use strict";

import Router from "./Router.js";
import Debugger from "./Debugger.js";

class MainApp {

    constructor () {
        Debugger.print("Application was created");
        new Router();
    }
}

window.addEventListener("load", function () {
    new MainApp();
});
