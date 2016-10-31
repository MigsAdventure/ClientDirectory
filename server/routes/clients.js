const express = require('express');
const moment = require('moment');


const router = express.Router();

const Client = require('../models/Client');

router.route('/')
.get((req, res) => {
  console.log('query:', req.query);
  let dbQuery = Client.find()
  if (req.query.pagesize) {
    dbQuery.limit(parseInt(req.query.pagesize) || 20);
  }

  if (req.query.gender) {
    dbQuery.where({gender: req.query.gender});
  }

  if (req.query.minage) {
    dbQuery.where('age').gte(req.query.minage);
  }

  if (req.query.maxage) {
    dbQuery.where('age').lte(req.query.maxage);
  }

  if (req.query.allergy) {
    dbQuery.find({ allergies: req.query.allergy });
  }

  if (req.query.page) {
    let { page } = req.query;
    req.query.pagesize ? pagesize=req.query.pagesize : pagesize = 1;
    dbQuery.limit(pagesize)
    .skip(page * pagesize).limit(pagesize)
  }

  dbQuery
  .limit(parseInt(req.query.pagesize) || 20)
  .then(users => res.send(users))
  .catch(err => res.status(400).send(err));

  Client.find()
  .limit(parseInt(req.query.pagesize) || 20)
  .then((clients) => {
    res.send(clients);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
})
.post((req, res) => {
  Client.create(req.body)
  .then((currClient) => {
    res.send(currClient);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

router.route('/:id')
.get((req, res) => {
  Client.findById(req.params.id)
  .then((currClient) => {
    res.status(200).send(currClient);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
})
.put((req, res) => {
  Client.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    res.status(err ? 400 : 200).send(err || req.body);
  });
})
.delete((req, res) => {
  Client.findByIdAndRemove(req.params.id)
  .then((currClient) => {
    res.status(200).send(`deleted:\n ${currClient}`);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});


module.exports = router;
