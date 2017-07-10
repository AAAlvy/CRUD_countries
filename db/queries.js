const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('country');
  },
  getOne(id) {
    return knex('country').where('id', id).first();
  },
  create(country) {
    return knex('country').insert(country, '*');
  },
  update(id, country) {
    return knex('country').where('id', id).update(country, '*');
  },
  delete(id) {
    return knex('country').where('id', id).del();
  }
};
