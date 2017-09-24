"use strict";

import RequestToHost from "./RequestToHost.js";

let whoamiMixin = {
    whoami() {
        const t = this;

        const reqUser = new RequestToHost();

        reqUser.whoami(function (err, resp) {
            const logBox = t.getElementByClass("main-page__user");
            if (err) {
                return logBox.innerHTML = "Привет, Гость!";
            }

            logBox.innerHTML = "Привет, " + resp.login + "!";
        });
    }
};

export default whoamiMixin;
