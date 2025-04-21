var ThumbmarkJS = require('@thumbmarkjs/thumbmarkjs');

let thumbmarkDataCache = null;

// Pre-fetch thumbmark data on initialization
ThumbmarkJS.getFingerprintData()
  .then(data => {
    console.log('Loaded thumbmark data.');
    thumbmarkDataCache = data;
  })
  .catch(err => {
    console.error('Failed to fetch thumbmark data:', err);
  });

module.exports = function(params) {
  const { payload, next } = params;
  console.log('ThumbmarkJS middleware');

  if (thumbmarkDataCache) {
    console.log('Thumbmark data available, adding to payload');
    payload.obj.context.thumbmark = thumbmarkDataCache;
  } else {
    console.warn('Thumbmark data not available, proceeding without it');
  }

  console.log('ThumbmarkJS - payload:', payload);

  // Synchronously call next to pass the payload along.
  next(payload);
};
