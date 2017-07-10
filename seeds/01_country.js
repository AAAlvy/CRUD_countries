const countries = require('../countries');

exports.seed = function(knex, Promise) {
  return knex('country').del()
    .then(function () {
      return knex('country').insert(countries);
    });
};
