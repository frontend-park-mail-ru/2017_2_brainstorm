// наименование для нашего хранилища кэша
const CACHE_NAME = 'brise_serviceworker_v1';
// ссылки на кэшируемые файлы
const cacheUrls = [
    '/',
    '/main',
    '/play',
    '/info',
    '/records',
    'dist/app.js',
    'dist/app.css',

    'img/back_2.png',
    'img/bubblerise.png',
    'img/button_play.png',
    'img/info.png',
    'img/login.png',
    'img/logo_3.png',
    'img/record.png',
    'img/restart.png',

    'game-modules/libs/CanvasRenderer.js',
    'game-modules/libs/dat.gui.min.js',
    'game-modules/libs/Projector.js',
    'game-modules/libs/stats.min.js',
    'game-modules/libs/three.min.js'
];

this.addEventListener('install', function (event) {
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
    );
});

this.addEventListener('fetch', function (event) {
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