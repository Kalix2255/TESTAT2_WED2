var express = require('express');
var note = require('../controller/noteController');
var router = express.Router();


/* GET home page. */
router.get('/', note.renderIndex);

module.exports = router;

