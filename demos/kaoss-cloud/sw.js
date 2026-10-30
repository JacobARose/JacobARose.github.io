// Kill-switch for the retired Kaoss Cloud PWA (now Chaos Conductor at /demos/chaos-conductor/).
// Browsers that still have the old Workbox worker installed fetch this file on their next
// update check: it replaces the old worker, clears its caches, unregisters itself, and
// sends any open tabs to the new URL.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Only this scope's caches: other demos on the origin (e.g. chaos-conductor) have their own.
      // Workbox cache names embed the scope, e.g. "workbox-precache-v2-https://…/demos/kaoss-cloud/".
      const keys = await caches.keys();
      const scope = self.registration.scope;
      await Promise.all(keys.filter((key) => key.includes(scope)).map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate("/demos/chaos-conductor/"));
    })(),
  );
});
