"use strict";

import RequestToHost from "./RequestToHost.js";

const messagesWhoAmI = {
    GUEST_HELLO_MESSAGE : "Привет, Гость!",
    USER_HELLO_MESSAGE : "Привет, "
};

let whoamiMixin = {
    whoami() {
        RequestToHost.whoami((err, resp) => {
            const loginBox = document.querySelector(".main-page__user");
            if (err) {
                return loginBox.innerHTML = messagesWhoAmI.GUEST_HELLO_MESSAGE;
            }
            loginBox.innerHTML = `${messagesWhoAmI.USER_HELLO_MESSAGE} ${resp.login}! Личный рекорд: ${resp.localRecord}`;
        });
    }
};

export default whoamiMixin;
