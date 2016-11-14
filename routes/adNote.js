var express = require('express');
var router = express.Router();
var notes = require('../controller/noteController.js');

/* GET adNote listing. */
router.get('/', notes.initialNote);
router.post('/', notes.createNote);

module.exports = router;
