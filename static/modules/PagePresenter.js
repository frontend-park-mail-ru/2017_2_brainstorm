"use strict";

export default class PagePresenter {

    static hideAllPages() {
        let pages = document.getElementsByClassName("page");
        for (let i = 0; i < pages.length; i++) {
            pages[i].hidden = true;
        }
    }

    static showOnlyOnePage(pageName) {
        PagePresenter.hideAllPages();
        document.querySelector("." + pageName).hidden = false;
    }
}
