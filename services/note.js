var Datastore = require('nedb');
var db = new Datastore({filename: './data/note.json', autoload: true});


function Note(title, desc, imp, doneU, creatingdate, state){
    this.title = title;
    this.desc = desc;
    this.imp = imp;
    this.doneU = doneU;
    this.creatingdate = creatingdate;
    this.state = state;
}

function addNote(title, desc, imp, doneU, creatingdate, state, callback) {
    var note = new Note(title, desc, imp, doneU, creatingdate, state);
    //wenn db insert einen Fehler wirft, wird das im err aufgefangen... im newDoc ist das Resultat wenn KEIN Fehlerfall, also das note das neu hinzugefügt wurde
    db.insert(note, function (err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}

function getData(options, callback) {
    //Bei db.find wird als erster Param. die Filterfunktion und dann der callback angegeben


    db.find(options.showstate ? {state:{$exists: true}} : {})
        .sort({[options.orderby]: (options.sortdesc ? 1 : -1)}).exec(callback);
}

function getDatabyID(id, res){
 // db.find({$where: function (id) { return Object.is(_id, id);}});
      
    db.findOne({_id:id},  function (err, note) {
        if(err){
            res.status(err.status || 500);
            res.render('error');
        }
        res.render('newNote', note);

    });

}

function updatePostData(id, title, desc, imp, doneU, state, callback){
    var note = new Note(title, desc, imp, doneU, state);
    //wenn db insert einen Fehler wirft, wird das im err aufgefangen... im newDoc ist das Resultat wenn KEIN Fehlerfall, also das note das neu hinzugefügt wurde
    db.update({_id: id}, {$set: {"title": title, "desc":desc, "imp": imp, "doneU": doneU, "state": state}}, function(err, doc){
        callback(err, doc);
    });

}



//WICHTIG: alle funktionen exportieren damit andere Functionen die sehen
module.exports = {add : addNote, getData : getData, getDatabyID :getDatabyID, update: updatePostData};