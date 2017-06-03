const express = require('express');
const getJSON = require('../utils/getJSON');
const router = express.Router();

const twitchId = 'o5n16enllu8dztrwc6yk15ncrxdcvc';

function joinValues(vals) {
  return [].concat.apply([], vals);
}

function getTwitchStreams(gameTitle) {
  const url = 'https://api.twitch.tv/kraken/streams/?game=' + gameTitle + '&client_id=' + twitchId + '&callback=';
  return getJSON(url);
}

/* GET search api. */
router.get('/', function(req, res, next) {
  const gameTitle = req.query.query;
  Promise.all([
    getTwitchStreams(gameTitle),
  ]).then(function(values) {
    res.send(joinValues(values));
  });
});

module.exports = router;
