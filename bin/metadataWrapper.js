'use strict';

const Promise = require('bluebird');
const fs = require('fs');

module.exports = function (name) {
  return new Promise(function (resolve, reject) {
    mm(fs.createReadStream(name), function (err, metadata) {
      if (err) return reject(err);

      metadata.path = name;
      metadata.picture = metadata.picture[0] || { data: new Buffer(0), format: 'jpg' };
      // replace data with a copy to prevent caching
      var secondPictureBuffer = new Buffer(metadata.picture.data.length);
      metadata.picture.data.copy(secondPictureBuffer);
      metadata.picture.data = secondPictureBuffer;

      resolve(metadata);
    });
  });
};
