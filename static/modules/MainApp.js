"use strict";

import Router from "./Router.js";
import Debugger from "./Debugger.js";
import "../views/info-page/info.scss";
import "../views/login-page/login.scss";
import "../views/main-page/main.scss";
import "../views/main-page/playmenu.scss";
import "../views/play-page/play.scss";
import "../views/multyplay-page/multyplay.scss";
import "../views/records-page/records.scss";
import "../views/register-page/register.scss";
import "./../styles/form.scss";
import "./../styles/message-box.scss";
import "./../styles/style.scss";

class MainApp {

    constructor () {
        Debugger.print("Application was created");

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("service-worker.js")
                .then(function (registration) {
                    // при удачной регистрации имеем объект типа ServiceWorkerRegistration
                    console.log("ServiceWorker registration", registration);
                })
                .catch(function (err) {
                    // throw new Error('ServiceWorker error: ' + err);
                    console.error("Registration err", err);
                });
        }

        const router = new Router();
        router.getMe(router);
        router.sendRouter();
    }
}

window.addEventListener("load", function () {
    new MainApp();
});
