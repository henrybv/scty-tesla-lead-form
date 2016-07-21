'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
module.exports = router;

router.get('/', function (req, res, next) {
  mongoose.model('User')
  .find(req.query)
  .then(function (users) {
    res.json(users);
  })
  .then(null, next);
});

router.post('/', function (req, res, next) {
  mongoose.model('User')
  .create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .then(null, next);
});

router.param('userId', function (req, res, next, id) {
  mongoose.model('User')
  .findById(id)
  .then(function (user) {
    console.log("THIS IS THE USER", user);
    if(!user) throw new Error('not found!');
    req.user = user;
    next();
  })
  .then(null, next);
});

router.get('/:userId', function (req, res) {
  res.json(req.user);
});

router.put('/:userId', function (req, res, next) {
  req.user.set(req.body);
  req.user.save()
  .then(function (user) {
    res.status(200).json(user);
  })
  .then(null, next);
});

router.delete('/:userId', function (req, res, next) {
  req.user.remove()
  .then(function () {
    res.status(204).end();
  })
  .then(null, next);
});

// a user/ customer can get quotes for multiple properties, or lead entries
router.get('/:userId/entries', (req, res) => res.json(req.user.entries) );

router.post('/:userId/entries', function (req, res, next) {
  req.user.entries.addToSet(req.body.entry);
  req.user.save()
  .then( () => mongoose.model('entry').findById(req.body.entry._id || req.body.entry).populate('artists') )
  .then( entry => res.status(201).json(entry) )
  .then(null, next);
});

router.delete('/:userId/entries/:entryId', function (req, res, next) {
  req.user.entries.pull(req.params.entryId);
  req.user.save()
  .then(function () {
    res.sendStatus(204);
  })
  .then(null, next);
});
