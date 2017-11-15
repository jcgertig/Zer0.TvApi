const express = require('express');
const giantbomb = require('giantbomb');
const router = express.Router();
const gb = giantbomb('8e921245e839d8a5591c97fbf3210633a8d58f39');

/* GET type ahead api. */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  const config = {
    limit: 10,
    fields: [
      'name',
      'image',
      'id'
    ],
    /*filters: [
      { field: 'name', value: req.query.query },
      { field: 'aliases', value: req.query.query }
    ]*/
  };

  gb.games.search(req.query.query, config, (err, val, body) => {
    res.send(body.results);
  });
});

module.exports = router;
