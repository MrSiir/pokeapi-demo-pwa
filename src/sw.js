/* eslint-disable no-undef */

workbox.core.setCacheNameDetails({ prefix: 'pokeapi-demo' })

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

workbox.routing.registerRoute(
  new RegExp('https://raw\\.githubusercontent\\.com/PokeAPI/sprites/master/sprites/pokemon/.*\\.(png|jpg|jpeg)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'pokemons',
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin()
    ],
    matchOptions: {
      ignoreSearch: true,
      ignoreVary: true
    }
  })
)

/**
  * The workboxSW.precacheAndRoute() method efficiently caches and responds to
  * requests for URLs in the manifest.
  * See https://goo.gl/S9QRab
  */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
