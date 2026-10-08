var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond data pengguna');
});

router.get('/detail', function(req, res, next) {
  res.send('respond detail data pengguna');
});


module.exports = router;
