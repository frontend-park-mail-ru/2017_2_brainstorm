// наименование для нашего хранилища кэша
const CACHE_NAME = "brise_serviceworker_v2";
// ссылки на кэшируемые файлы
const cacheUrls = [
    "/",
    "/main",
    "/play",
    "/multyplay",
    "/info",
    "/records",
    "dist/app.js",

    "img/back_2.png",
    "img/bubblerise.png",
    "img/button_play.png",
    "img/info.png",
    "img/login.png",
    "img/logo_3.png",
    "img/record.png",
    "img/restart.png",
    "img/multy.png",
    "img/single.png",

    "game-modules/libs/CanvasRenderer.js",
    "game-modules/libs/dat.gui.min.js",
    "game-modules/libs/Projector.js",
    "game-modules/libs/stats.min.js",
    "game-modules/libs/three.min.js"
];

// "dist/app.css",

this.addEventListener("install", function (event) {
    // this.skipWaiting()
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
            .then(
                // сразу активируем текущую версию
                this.skipWaiting()
            )
    );
});

this.addEventListener("fetch", function (event) {
    // console.log(event);
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches.match(event.request).then(function (cachedResponse) {
            // выдаём кэш, если он есть
            if (cachedResponse) {
                return cachedResponse;
            }
            // иначе запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
});

this.addEventListener("activate", function(event) {
    let cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        // onActivate(event, config).then(() => self.clients.claim())

        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
    );
});