"use strict";

import RequestToHost from "./RequestToHost.js";

let whoamiMixin = {
    whoami() {
        const reqUser = new RequestToHost();

        reqUser.whoami((err, resp) => {
            const loginBox = this.getElementByClass("main-page__user");
            if (err) {
                return loginBox.innerHTML = "Привет, Гость!";
            }
            loginBox.innerHTML = "Привет, " + resp.login + "!";
        });
    }
};

export default whoamiMixin;
