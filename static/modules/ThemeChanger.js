"use strict";

import {bodyStyles, mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover} from "./themeStyles.js";
import RequestToHost from "./RequestToHost.js";
import Debugger from "./Debugger";

export default class ThemeChanger {

    constructor() {
        this.styles = "";
        this.generateTheme([bodyStyles, mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover]);
        this.userTheme = false;
        this.sendRequestForTheme();
        this.addEventsOnButtons();
    }

    sendRequestForTheme() {
        RequestToHost.whoami((err, resp) => {
            if (err) {
                return Debugger.print("not AUTH for GET");
            } else {
                Debugger.print("YOUR THEME resp = " + resp.theme);
                this.userTheme = resp.theme && true;
                this.applyTheme();
            }
        });
    }

    sendRequestToSaveTheme() {
        RequestToHost.whoami((err) => {
            if (err) {
                return Debugger.print("not AUTH for PATCH");
            } else {
                RequestToHost.theme(+this.userTheme, (err) => {
                    if (err) {
                        return Debugger.print("Can't add theme");
                    }
                });
            }
        });
    }

    generateTheme(themeStyles) {
        const createThemeStylesheet = (styles) => {
            return styles.reduce((stylesheet, current) => {
                const properties = Object.entries(current.styles).map(prop => prop[0] + ":" + prop[1] + ";");
                stylesheet += `${current.selector} {${properties}}\n`;
                return stylesheet;
            }, "");
        };
        this.styles = createThemeStylesheet(themeStyles);
    }

    applyTheme() {
        Debugger.print("YOUR THEME apply = " + this.userTheme);
        const addThemeStylesheet = (stylesheet) => {
            let styleTag = document.querySelector(".theme-styles");
            styleTag.innerHTML = stylesheet;
        };
        let stylesheet = this.userTheme ? this.styles : "";
        addThemeStylesheet(stylesheet);
    }

    changeTheme() {
        this.userTheme = !this.userTheme;
        this.applyTheme();
        this.sendRequestToSaveTheme();
    }

    addEventsOnButtons() {
        document.querySelector(".main-box__theme-changer").addEventListener("click", () => {
            this.changeTheme();
        });
    }
}
