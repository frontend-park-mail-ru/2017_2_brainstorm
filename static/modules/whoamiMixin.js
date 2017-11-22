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
                document.querySelector(".message-box__multiplay-hold").hidden = false;
                return loginBox.innerHTML = messagesWhoAmI.GUEST_HELLO_MESSAGE;
            }
            loginBox.innerHTML = `${messagesWhoAmI.USER_HELLO_MESSAGE} ${resp.login}! <br>Личный рекорд: ${resp.localRecord}`;
            document.querySelector(".message-box__multiplay-hold").hidden = true;
        });
    }
};

export default whoamiMixin;
