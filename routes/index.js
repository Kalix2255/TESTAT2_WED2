var express = require('express');
var data = require('../services/note')
var router = express.Router();

let options = {
    byfinishDate: false,
    bycreateDate: false,
    byimportance: false,
    showfinished: false,
    changestyle: false
};


router.use((req, res, next) =>{
    if(req.cookies.options){
        options = JSON.parse(req.cookies.options);
    }
    next();
});


/* GET home page. */
router.get('/', function(req, res) {

        res.charset = 'utf-8';
        const qOptions = {
            byfinishDate: req.query.finishdate,
            bycreateDate: req.query.createdata,
            byimportance: req.query.importance,
            showfinished: req.query.finished,
            changestyle: req.query.stylechange

    };

     setOptions(qOptions, res);


    data.getData(function (err, notes) {

        //WICHTIG: um render Daten mitzugeben, muss man ihn im zweiten Param. mitgeben
        //notes ist ein array und wird darum in ein neues objekt mit dem gleichen namen gespeichert, damit man cookies oder sonst was auch nocht
        //ins object speichern kann
        res.render('index', { notes: notes });
    });
});

function setOptions(qOptions, res){
    options = {
        byfinishDate: qOptions.byfinishDate === undefined ? options.byfinishDate : qOptions.byfinishDate,
        bycreateDate: qOptions.bycreateDate === undefined ? options.bycreateDate : qOptions.bycreateDate,
        byimptance: qOptions.byimportance === undefined ? options.byimportance : qOptions.byimportance,
        showfinished: qOptions.showfinished === undefined ? options.showfinished : qOptions.showfinished,
        changestyle: qOptions.changestyle === undefined ? options.changestyle : qOptions.changestyle
    };

    res.cookie('options', JSON.stringify(options));
}



module.exports = router;
