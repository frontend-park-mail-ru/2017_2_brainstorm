"use strict";

import Router from "./Router.js";
import Debugger from "./Debugger.js";
import "./../styles/info.css";
import "./../styles/login.css";
import "./../styles/main.css";
import "./../styles/play.css";
import "./../styles/records.css";
import "./../styles/register.css";
import "./../styles/style.css";

class MainApp {

    constructor () {
        Debugger.print("Application was created");
        new Router();
    }
}

window.addEventListener("load", function () {
    new MainApp();
});
