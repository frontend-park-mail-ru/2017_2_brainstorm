"use strict";

import {bodyStyles,mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover} from "./themeStyles.js";
import RequestToHost from "./RequestToHost.js";

export default class ThemeChanger {

    constructor() {
        this.styles = "";
        this.generateTheme([bodyStyles, mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover]);
        this.userTheme = false;

        this.sendRequestForTheme();

        console.log("YOUR THEME this to BOOL = " + this.userTheme);

        this.addEventsOnButtons();
    }

    sendRequestForTheme() {
        RequestToHost.whoami((err, resp) => {
            if (err) {
                return console.log("not AUTH for GET");
            } else {
                console.log("YOUR THEME resp = " + resp.theme);
                this.userTheme = resp.theme && true;
                // this.userTheme ? this.applyTheme() : "";
                this.applyTheme();
            }
        });
    }

    sendRequestToSaveTheme() {
        RequestToHost.whoami((err, resp) => {
            if (err) {
                return console.log("not AUTH for PATCH");
            } else {
                RequestToHost.theme(+this.userTheme, (err) => {
                    if (err) {
                        return console.log("Can't add theme");
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
        console.log("YOUR THEME apply = " + this.userTheme);

        const addThemeStylesheet = (stylesheet) => {
            let styleTag = document.querySelector(".theme-styles");
            styleTag.innerHTML = stylesheet;
        };
        let stylesheet = this.userTheme ? this.styles : "";
        addThemeStylesheet(stylesheet);
    }

    changeTheme() {
        console.log("YOUR THEME change 1 = " + this.userTheme);
        this.userTheme = !this.userTheme;
        console.log("YOUR THEME change 2 = " + this.userTheme);
        this.applyTheme();
        this.sendRequestToSaveTheme();
    }

    addEventsOnButtons() {
        document.querySelector(".main-box__theme-changer").addEventListener("click", () => {
            this.changeTheme();
        })
    }
}
