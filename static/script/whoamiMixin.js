"use strict";

import RequestToHost from "./RequestToHost.js";

let whoamiMixin = {
    whoami() {
        const reqUser = new RequestToHost();

        reqUser.whoami((err, resp) => {
            const logBox = this.getElementByClass("main-page__user");
            if (err) {
                return logBox.innerHTML = "Привет, Гость!";
            }
            logBox.innerHTML = "Привет, " + resp.login + "!";
        });
    }
};

export default whoamiMixin;
