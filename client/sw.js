console.log('Service Worker loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push received...');

    self.registration.showNotification(data.title, {
        body: data.body,
    });
});