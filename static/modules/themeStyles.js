"use strict";

const bodyStyles = {
    selector: "body",
    styles: {
        "background-color": "lightsalmon",
    }
};

const mainBoxStyles = {
    selector: ".main-box",
    styles: {
        "background": "#ffc3ac",
    }
};

const buttonLoginStyles = {
    selector: ".main-menu__button-login",
    styles: {
        "border": "1em solid rgb(89, 145, 255)",
    }
};

const themeChangerStyles = {
    selector: ".main-box__theme-changer",
    styles: {
        background: "lavender",
    }
};

const themeChangerStylesHover = {
    selector: ".main-box__theme-changer:hover",
    styles: {
        background: "#e0d9fb",
    }
};

export {bodyStyles,mainBoxStyles, buttonLoginStyles, themeChangerStyles, themeChangerStylesHover};