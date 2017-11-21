import TouchDelegater from "./TouchDelegater.js";
"use strict";

export default class MessageBox {

    constructor() {
        setInterval(() => {
            const xx = (parseInt(window.innerWidth) - 500) / 2;
            const yy = (parseInt(window.innerHeight) - 250) / 2;
            const box = document.getElementsByClassName("message-box")[0];
            box.style.left = xx + "px";
            box.style.top = yy + "px";
        }, 100);
        this.addEventOnFon();
    }

    static fonBox() {
        return ".fon-box";
    }

    static messageBox() {
        return ".message-box";
    }

    static hideMessageBox() {
        document.querySelector(".fon-box").hidden = true;
        document.querySelector(".message-box").hidden = true;
    }

    static showMessageBox() {
        document.querySelector(".fon-box").hidden = false;
        document.querySelector(".message-box").hidden = false;
    }

    addEventOnFon() {
        // delegate
        TouchDelegater.delegateTouch(MessageBox.fonBox());
        document.querySelector(MessageBox.fonBox()).addEventListener("click", () => {
            MessageBox.hideMessageBox();
        });
    }
}
