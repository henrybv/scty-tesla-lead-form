'use strict';

app.factory('UserFactory', function ($http) {

  var UserFactory = {};

  UserFactory.submitLead = function (userLead) {
    return $http.post('/api/users', userLead)
  };

  UserFactory.fetchAll = function () {
    return $http.get('/api/users')
    .then(function (res) {
      return res.data;
    });
  };

  UserFactory.fetchById = function (userId) {
    return $http.get('/api/users/' + userId)
    .then(function (res) {
      return res.data;
    });
  };

  return UserFactory;

});