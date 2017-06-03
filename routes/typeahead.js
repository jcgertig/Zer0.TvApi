const express = require('express');
const giantbomb = require('giantbomb');
const router = express.Router();
const gb = giantbomb('8e921245e839d8a5591c97fbf3210633a8d58f39');

/* GET type ahead api. */
router.get('/', function(req, res, next) {
  const config = {
    limit: 10,
    fields: [
      'name',
      'image'
    ],
    filters: [
      { field: 'name', value: req.query.query },
      { field: 'aliases', value: req.query.query }
    ]
  };

  gb.games.list(config, (err, val, body) => {
    res.send(body.results);
  });
});

module.exports = router;
