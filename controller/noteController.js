/**
 * Created by andre on 12.11.2016.
 */
var store = require("../services/note.js");
var qs = require('qs');


module.exports.renderSite = function (req, res) {
    res.render('newNote');

};

module.exports.postData = function (req, res) {
    let title = (req.body.input_title);
    let desc = (req.body.input_description);
    let imp = (req.body.input_importance);
    let doneU = (req.body.input_doneUntil);
    store.add(title, desc, imp, doneU, function (err, newDoc) {
        if(err){
            res.status(err.status || 500);
            res.render('error');
            return;
        }

        //WICHTIG: redirect gibt den absoluten PFAD an
        res.redirect('/');
    });

   // res.redirect("/adNote?"+qs.stringify({title /*, desc, imp, doneU*/}));

};


/*module.exports.renderData = function (req, res) {


}*/