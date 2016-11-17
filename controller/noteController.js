/**
 * Created by andre on 12.11.2016.
 */
var store = require("../services/note.js");
var qs = require('qs');


module.exports.renderSite = function (req, res, data) {
    res.render('newNote', data);

};

module.exports.renderEditSite = function (req, res) {

    store.getDatabyID(req.query.id, res);


};

module.exports.postData = function (req, res) {
    let title = (req.body.input_title);
    let desc = (req.body.input_description);
    let imp = (req.body.input_importance);
    let doneU = (req.body.input_doneUntil);
    let state = (req.body.state);
    let creatingdate = new Date();
    store.add(title, desc, imp, doneU, creatingdate, state, function (err, newData) {
        if (err) {
            res.status(err.status || 500);
            res.render('error');
            return;
        }

        //WICHTIG: redirect gibt den absoluten PFAD an
        res.redirect('/');
    });
};

module.exports.updatePostData = function (req, res) {
    let id = (req.body.noteID);
    let title = (req.body.input_title);
    let desc = (req.body.input_description);
    let imp = (req.body.input_importance);
    let doneU = (req.body.input_doneUntil);
    let state = (req.body.state);
    store.update(id, title, desc, imp, doneU, state, function (err, upData) {
        if (err) {
            res.status(err.status || 500);
            res.render('error');
            return;
        }
    });
};




