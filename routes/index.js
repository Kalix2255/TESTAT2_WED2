var express = require('express');
var data = require('../services/note')
var router = express.Router();

let options = {
    orderby: 'doneU',
    sortdesc: false,
    showstate: false,
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
            orderby: req.query.orderby,
            sortdesc: req.query.sortdesc ? req.query.sortdesc == 'true' : undefined,
            showstate:  req.query.showstate ? req.query.showstate == 'true' : undefined,
            changestyle:  req.query.changestyle ? req.query.changestyle == 'true' : undefined

    };

     setOptions(qOptions, res);


    data.getData(options, function (err, notes) {

        //WICHTIG: um render Daten mitzugeben, muss man ihn im zweiten Param. mitgeben
        //notes ist ein array und wird darum in ein neues objekt mit dem gleichen namen gespeichert, damit man cookies oder sonst was auch nocht
        //ins object speichern kann
       let notedata = {
            notes : notes,
            options: options
        };
        res.render('index', notedata);
    });
});

function setOptions(qOptions, res){
    options = {
        orderby: qOptions.orderby === undefined ? options.orderby : qOptions.orderby,
        sortdesc: qOptions.sortdesc === undefined ? options.sortdesc : qOptions.sortdesc,
        showstate: qOptions.showstate === undefined ? options.showstate : qOptions.showstate,
        changestyle: qOptions.changestyle === undefined ? options.changestyle : qOptions.changestyle
    };

    res.cookie('options', JSON.stringify(options));
}



module.exports = router;

