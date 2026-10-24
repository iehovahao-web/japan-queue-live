const CACHE="jql-v5-table-parser";
const ASSETS=[
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./privacy.html",
  "./terms.html",
  "./legal.css"
];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const request=event.request,url=new URL(request.url);
  // Live queue data is never served from cache.
  if(request.method!=="GET"||url.origin!==self.location.origin||url.pathname.includes("/api/"))return;

  event.respondWith(
    fetch(request)
      .then(response=>{
        if(response.ok&&response.type==="basic"){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(request,copy));
        }
        return response;
      })
      .catch(()=>caches.match(request).then(hit=>hit||(request.mode==="navigate"?caches.match("./index.html"):undefined)))
  );
});
