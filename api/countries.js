const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validCountry(country) {
  const hasName = typeof country.name == 'string' && country.name.trim() != '';
  const hasContinent = typeof country.continent == 'string' && country.continent.trim() != '';
  const hasPopulation = !isNaN(country.population);
  const hasArea_rank = !isNaN(country.area_rank);
  return hasName && hasArea_rank && hasContinent && hasPopulation;
}

router.get('/', (req, res) => {
  queries.getAll().then(countries => {
    res.json(countries);
  });
});

router.get('/:id', isValidId, (req, res) =>{
  queries.getOne(req.params.id).then(country => {
    if(country) {
      res.json(country);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if(validCountry(req.body)) {
    queries.create(req.body).then(countries => {
      res.json(countries[0]);
    });
  } else {
    next(new Error('Invalid country'));
  }
});

router.put('/:id', (req, res, next) => {
  if(validCountry(req.body)) {
    queries.update(req.params.id, req.body).then(countries => {
      res.json(countries[0]);
    });
  } else {
    next(new Error('Invalid country'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
