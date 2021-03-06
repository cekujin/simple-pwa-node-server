const publicVapidKey = "BJVJ68dfNQeovIBGRPkoRA3wGa-S64U6zaPIrafZq34tXKls7gNhyYLd6VewaCtXCS1FYZYolc5BQpFrI3fhr4Y";

if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

async function send() {
    console.log('Registering Service Worker...');
    const register = await navigator.serviceWorker.register('sw.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');

    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered...');

    console.log('Sending Push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent...')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}