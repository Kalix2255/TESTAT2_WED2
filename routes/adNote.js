var express = require('express');
var note = require('../controller/noteController.js')
var router = express.Router();


/* GET adNote listing. */
//WICHTIG: get und post geben den relativen PFAD zum aktuellen PFAD an

router.get('/', note.renderSite);


router.post('/', note.postData);


module.exports = router;
