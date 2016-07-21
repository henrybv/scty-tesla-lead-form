'use strict';

var _ = require('lodash');

module.exports = function (schema) {
  schema.statics.findOrCreate = function (query, create) {
    return this
    .findOne(query)
    .then(result => result || this.create(_.merge(query, create)) );
  };
};
