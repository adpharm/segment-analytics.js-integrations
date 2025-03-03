var ThumbmarkJS = require('@thumbmarkjs/thumbmarkjs');

let thumbmarkDataCache = null;
let debug = false;

// Pre-fetch thumbmark data on initialization
ThumbmarkJS.getFingerprintData()
  .then(data => {
    if (debug) console.log('Loaded thumbmark data.');
    thumbmarkDataCache = data;
  })
  .catch(err => {
    if (debug) console.error('Failed to fetch thumbmark data:', err);
  });

module.exports = function(params) {
  const { payload, next } = params;
  if (debug) console.log('ThumbmarkJS middleware');

  if (thumbmarkDataCache) {
    if (debug) console.log('Thumbmark data available, adding to payload');
    payload.obj.context.thumbmark = thumbmarkDataCache;
  } else {
    if (debug)
      console.warn('Thumbmark data not available, proceeding without it');
  }

  if (debug) console.log('ThumbmarkJS - payload:', payload);

  // Synchronously call next to pass the payload along.
  next(payload);
};
