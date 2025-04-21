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

let ubidCache = null;

// Pre-fetch thumbmark data on initialization
ThumbmarkJS.getFingerprint()
  .then(data => {
    // console.log('Loaded ubid data.');
    ubidCache = data;
  })
  .catch(err => {
    // console.error('Failed to fetch ubid data:', err);
  });

module.exports = function(params) {
  const { payload, next } = params;
  // console.log('ubid middleware');

  if (ubidCache) {
    // console.log('ubid data available, adding to payload');
    payload.obj.context.ubid = ubidCache;
  } else {
    // console.warn('ubid data not available, proceeding without it');
  }

  // console.log('ubid - payload:', payload);

  // Synchronously call next to pass the payload along.
  next(payload);
};
