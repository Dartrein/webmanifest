const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  'https://static.tildacdn.com/stor3639-6130-4531-a433-373331386337/-/resizeb/x20/14788712.jpg',
  'https://static.tildacdn.com/stor3738-6366-4661-b039-633465383538/-/resizeb/x20/93883309.jpg',
  'https://static.tildacdn.com/stor3565-3763-4366-a633-373233343062/-/resizeb/x20/85720469.jpg',
  'https://static.tildacdn.com/stor3536-6565-4431-a563-636630623264/-/resizeb/x20/51669377.jpg',
  'https://static.tildacdn.com/tild6139-6135-4534-b137-383438346137/TildaSans-VF.woff2',
];

// событие install
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// событие activate
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// событие fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
