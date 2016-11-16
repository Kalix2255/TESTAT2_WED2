var express = require('express');
var note = require('../controller/noteController.js')
var router = express.Router();



/* GET adNote listing. */
//WICHTIG: get und post geben den relativen PFAD zum aktuellen PFAD an

router.get('/',function (req, res) {

    if(req.query.abort){
        res.redirect('/');
        return;
    }

    if(req.query.id) {
        note.renderEditSite(req, res);
        return;
    }
        note.renderSite(req, res);
  });


router.post('/', function (req, res) {
        if(req.body.noteID){
            note.updatePostData(req, res);
            res.redirect('/');
            return;
    }
    note.postData(req, res);



});


module.exports = router;
