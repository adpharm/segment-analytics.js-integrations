var ThumbmarkJS = require('@thumbmarkjs/thumbmarkjs');

ThumbmarkJS.setOption('exclude', [
  // permissions
  // excluding these because the user may update them at any time
  'permissions.geolocation',
  'permissions.camera',
  'permissions.microphone',
  'permissions.notifications',
  // system
  // excluding these because the user may update their browser at any time
  'system.browser.version',
  'system.useragent'
]);

const DEBUG = false; // Toggle this for production
const log = (msg, data) => DEBUG && console.log(`[Thumbmark-Segment] ${msg}`, data || '');

// 1. Initial State
let cachedUbid = window.sessionStorage.getItem('tm_ubid');
let fingerprintPromise = null;

if (cachedUbid) {
  log('Found ID in sessionStorage:', cachedUbid);
} else {
  log('No cache found. Starting fingerprint calculation...');
  fingerprintPromise = ThumbmarkJS.getFingerprint().then(id => {
    window.sessionStorage.setItem('tm_ubid', id);
    cachedUbid = id;
    log('Fingerprint generated and cached:', id);
    return id;
  });
}

module.exports = function({ payload, next }) {
  const eventName = payload.obj.event || payload.obj.type;
  
  // Scenario A: Fast Path (Cached)
  if (cachedUbid) {
    log(`Fast-tracking event: ${eventName}`);
    payload.obj.context.ubid = cachedUbid;
    return next(payload);
  }

  // Scenario B: Waiting for initial calculation
  log(`Waiting for fingerprint for event: ${eventName}`);
  const startTime = Date.now();
  
  const timeoutGate = new Promise(res => setTimeout(() => res('TIMEOUT'), 800));

  Promise.race([fingerprintPromise, timeoutGate])
    .then((result) => {
      const duration = Date.now() - startTime;

      if (result === 'TIMEOUT') {
        log(`Timeout reached (${duration}ms). Proceeding without ID for: ${eventName}`);
      } else if (result) {
        log(`Resolved during race (${duration}ms). Injecting ID into: ${eventName}`);
        payload.obj.context.ubid = result;
      }
      
      next(payload);
    })
    .catch((err) => {
      console.error('[Thumbmark-Segment] Error during race:', err);
      next(payload);
    });
};