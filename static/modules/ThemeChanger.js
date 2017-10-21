"use strict";

import {bodyStyles,mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover} from "./themeStyles.js";

export default class ThemeChanger {

    constructor() {
        this.styles = "";
        this.generateTheme([bodyStyles, mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover]);

        this.secondTheme = false;

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
        let stylesheet = this.secondTheme ? "" : this.styles;
        addThemeStylesheet(stylesheet);
        this.secondTheme = !this.secondTheme;
    }
}
