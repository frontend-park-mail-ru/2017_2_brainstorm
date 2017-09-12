"use strict";

export default class CorrectLoginPassword {

    constructor() {
        this.validData = 'abcdefghijklmnopqrstuvwxyz';
        this.validData += this.validData.toUpperCase() + '1234567890';
        // alert(this.validData);
    }

    correctLog(login) {
        if (login==="") {
            return "empty";
        }

        for (let i = 0; i < login.length; i++) {
            if (this.validData.indexOf(login[i]) === -1) {
                return "incorrect";
            }
        }

        return "ok";
    }

    correctPas(password) {
        if (password === "") {
            return "empty";
        }

        for (let i = 0; i < password.length; i++) {
            if (this.validData.indexOf(password[i]) === -1) {
                return "incorrect";
            }
        }

        return "ok";
    }

    correctForm(logValue, pasValue, errorBox)
    {
        let log = this.correctLog(logValue);
        let pas = this.correctPas(pasValue);

        if (log === "empty" || pas === "empty") {
            errorBox.innerHTML = "Заполнены не все поля";
        }

        else if(log === "incorrect" || pas === "incorrect") {
            errorBox.innerHTML = "Использованы недопустимые символы";
        }
        else {
            errorBox.innerHTML = "";
        }
    }
}