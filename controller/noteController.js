
var store = require("../services/note.js");
var qs = require('qs');
var options;


module.exports.renderIndex = function(req, res) {

        options = req.options;

        res.charset = 'utf-8';
        const qOptions = {
            orderby: req.query.orderby,
            sortdesc: req.query.sortdesc ? req.query.sortdesc == 'true' : undefined,
            showstate:  req.query.showstate ? req.query.showstate == 'true' : undefined,
            changestyle:  req.query.changestyle ? req.query.changestyle == 'true' : undefined

        };

        setOptions(qOptions, res);


        store.getData(options, function (err, notes) {

            //WICHTIG: um render Daten mitzugeben, muss man ihn im zweiten Param. mitgeben
            //notes ist ein array und wird darum in ein neues objekt mit dem gleichen namen gespeichert, damit man cookies oder sonst was auch nocht
            //ins object speichern kann
            let notedata = {
                notes : notes,
                options: options
            };
            res.render('index', notedata);
        });
    };



module.exports.renderSite = function (req, res, options) {
    res.render('newNote', options);

};

module.exports.renderEditSite = function (req, res, options) {

    store.getDatabyID(req.query.id, function (err, note) {

        var notedata = {
            note : note,
            options: options
        };
        res.render('newNote', notedata);
    });


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


function setOptions(qOptions, res){
    options = {
        orderby: qOptions.orderby === undefined ? options.orderby : qOptions.orderby,
        sortdesc: qOptions.sortdesc === undefined ? options.sortdesc : qOptions.sortdesc,
        showstate: qOptions.showstate === undefined ? options.showstate : qOptions.showstate,
        changestyle: qOptions.changestyle === undefined ? options.changestyle : qOptions.changestyle
    };

    res.cookie('options', JSON.stringify(options));
}





