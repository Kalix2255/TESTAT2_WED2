var Datastore = require('nedb');
var db = new Datastore({filename: './data/note.json', autoload: true});


function Note(title, desc, imp, doneU){
    this.title = title;
    this.desc = desc;
    this.imp = imp;
    this.doneU = doneU;
}

function addNote(title, desc, imp, doneU, callback) {
    var note = new Note(title, desc, imp, doneU);
    //wenn db insert einen Fehler wirft, wird das im err aufgefangen... im newDoc ist das Resultat wenn KEIN Fehlerfall, also das note das neu hinzugefügt wurde
    db.insert(note, function (err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}

function getData(callback) {
    //Bei db.find wird als erster Param. die Filterfunktion und dann der callback angegeben
    db.find({}, callback);
}

//WICHTIG: alle funktionen exportieren damit andere Functionen die sehen
module.exports = {add : addNote, getData : getData};