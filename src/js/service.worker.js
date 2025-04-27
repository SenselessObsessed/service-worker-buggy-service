importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precache(["/"]);
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { strategies } = workbox;

self.addEventListener("fetch", (evt) => {
  const url = new URL(evt.request.url);
  if (url.pathname.startsWith("/api")) {
    const networkFirst = new strategies.NetworkFirst();
    evt.respondWith(networkFirst.makeRequest({ request: evt.request }));
  }
});
