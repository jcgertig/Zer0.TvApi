var home = require('./home');
var typeahead = require('./typeahead');
var search = require('./search');

var routes = [
  {
    path: '/',
    handler: home
  },
  {
    path: '/api/v1/typeahead',
    handler: typeahead
  },
  {
    path: '/api/v1/search',
    handler: search
  }
];

module.exports = routes;
