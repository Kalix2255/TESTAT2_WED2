var express = require('express');
var router = express.Router();

/* GET adNote listing. */
router.get('/', function(req, res, next) {
  res.render('newNote');
});

module.exports = router;
