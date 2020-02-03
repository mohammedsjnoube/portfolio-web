"use strict";var CACHE_VERSION=1580750770025,CURRENT_CACHES={offline:"offline-v"+CACHE_VERSION,regular:"regular-v"+CACHE_VERSION},OFFLINE_URL="/offline",REGULAR_URLS=["/"];function createCacheBustedRequest(url){var bustedUrl=new URL(url,self.location.href);return bustedUrl.search+=(bustedUrl.search?"&":"")+"v="+CACHE_VERSION,new Request(bustedUrl)}self.addEventListener("install",function(event){var offLinePromise=fetch(createCacheBustedRequest(OFFLINE_URL)).then(function(response){return caches.open(CURRENT_CACHES.offline).then(function(cache){return cache.put(OFFLINE_URL,response)})}),regularPromise=caches.open(CURRENT_CACHES.regular).then(function(cache){return cache.addAll(REGULAR_URLS)});event.waitUntil(Promise.all([offLinePromise,regularPromise]))}),self.addEventListener("activate",function(event){var expectedCacheNames=Object.keys(CURRENT_CACHES).map(function(key){return CURRENT_CACHES[key]});event.waitUntil(caches.keys().then(function(cacheNames){return Promise.all(cacheNames.map(function(cacheName){if(-1===expectedCacheNames.indexOf(cacheName))return console.log("Deleting out of date cache:",cacheName),caches.delete(cacheName)}))}))}),self.addEventListener("fetch",function(event){("navigate"===event.request.mode||"GET"===event.request.method&&event.request.headers.get("accept").includes("text/html"))&&(console.log("Handling fetch event for",event.request.url),event.respondWith(fetch(event.request).catch(function(error){return console.log("Fetch failed; returning offline page instead.",error),caches.match(OFFLINE_URL)})))});