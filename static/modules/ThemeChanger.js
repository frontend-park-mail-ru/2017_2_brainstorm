"use strict";

import {bodyStyles,mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover} from "./themeStyles.js";
import RequestToHost from "./RequestToHost";

export default class ThemeChanger {

    constructor() {
        this.styles = "";
        this.generateTheme([bodyStyles, mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover]);
        // this.userTheme = false;




        this.userTheme = false;

        const userTheme = RequestToHost.whoami((err, resp) => {
            if (err) {
                return false;
            }
            return !!resp.template});
        userTheme ? this.applyTheme() : "";




        document.querySelector(".main-box__theme-changer").addEventListener("click", () => {
            this.applyTheme();
        })
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
        const addThemeStylesheet = (stylesheet) => {
            let styleTag = document.querySelector(".theme-styles");
            styleTag.innerHTML = stylesheet;
        };
        let stylesheet = this.userTheme ? "" : this.styles;
        addThemeStylesheet(stylesheet);
        this.userTheme = !this.userTheme;

        RequestToHost.template(+this.userTheme, (err, resp) => {
            if (err) {
                return false;
            }
            return resp.template;
        });
    }
}
