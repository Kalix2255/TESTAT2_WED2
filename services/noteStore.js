var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(title, description, noteRating, noteDate, noteState)
{
    this.noteTitle = title;
    this.noteDescription = description;
    this.noteRating = noteRating;
    this.noteDate = noteDate;
    this.noteState = noteState;
}


function publicAddNote(noteTitle, noteDescription, noteRating, noteDate, noteState , callback)
{
    var order = new Note(noteTitle, noteDescription, noteRating, noteDate, noteState);

    db.insert(order, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
        publicGet(id,callback);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
    callback( err, doc);
});
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll};