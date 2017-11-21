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
                document.querySelector(".message-box__multyplay-hold").hidden = false;
                return loginBox.innerHTML = messagesWhoAmI.GUEST_HELLO_MESSAGE;
            }
            loginBox.innerHTML = `${messagesWhoAmI.USER_HELLO_MESSAGE} ${resp.login}! <br>Личный рекорд: ${resp.localRecord}`;
            document.querySelector(".message-box__multyplay-hold").hidden = true;
        });
    }
};

export default whoamiMixin;
