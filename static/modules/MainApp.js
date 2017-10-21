"use strict";

import Router from "./Router.js";
import Debugger from "./Debugger.js";
import "../views/info-page/info.css";
import "../views/login-page/login.css";
import "../views/main-page/main.css";
import "../views/play-page/play.css";
import "../views/records-page/records.css";
import "../views/register-page/register.css";
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
