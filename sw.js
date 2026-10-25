// Service worker minimo: serve solo a rendere l'app installabile e ad aprire subito la schermata iniziale.
// Non intercetta mai la tua web app (quella resta sempre online e aggiornata).
var C='lifeblood-shell-v1';
var FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(function(r){var n=fetch(e.request).then(function(x){if(x&&x.ok){var cp=x.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return x}).catch(function(){return r});return r||n}));
});
