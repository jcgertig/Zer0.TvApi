var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zer0.Tv Api' });
});

module.exports = router;
