/* eslint-disable @typescript-eslint/no-explicit-any */
const CACHE_NAME = 'my-pwa-cache-v1'
const urlsToCache: string[] = [
	'/',
	'/index.html',
	'/static/js/main.chunk.js',
	'/static/js/0.chunk.js',
	'/static/js/bundle.js',
	'/static/css/main.chunk.css',
	'/manifest.json',
	'/logo192.png',
	'/logo512.png'
]

self.addEventListener('install', (event: any) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache: Cache) => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', (event: any) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response
			}

			return fetch(event.request).then((response: Response) => {
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response
				}

				const responseToCache = response.clone()

				caches.open(CACHE_NAME).then((cache: Cache) => {
					cache.put(event.request, responseToCache)
				})

				return response
			})
		})
	)
})

self.addEventListener('activate', (event: any) => {
	event.waitUntil(
		caches.keys().then((cacheNames: string[]) =>
			Promise.all(
				cacheNames.map((cacheName: string) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName)
					}
				})
			)
		)
	)
})

export {}
