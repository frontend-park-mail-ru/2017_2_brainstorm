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
