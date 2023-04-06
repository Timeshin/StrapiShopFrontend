const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('./service-worker.js')
				.then((registration) => {
					console.log('Service worker registered successfully:', registration.scope)

					registration.onupdatefound = () => {
						console.log('New version of service worker found.')

						const installingWorker = registration.installing

						if (installingWorker) {
							installingWorker.onstatechange = () => {
								if (installingWorker.state === 'installed') {
									console.log('New version of service worker installed.')
								}
							}
						}
					}
				})
				.catch((error) => {
					console.error('Error registering service worker:', error)
				})
		})
	}
}

export default registerServiceWorker
