var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    res.render("index");
};

module.exports.initialNote = function(req, res)
{
    res.render("newNote");
};

module.exports.createNote = function(req, res)
{
    var note = store.add(req.body.noteTitle, req.body.noteDescription, req.body.noteRating, req.body.noteDate , req.body.noteState, function(err, note) {
        res.render("index", note);
    });
};



module.exports.showNote = function(req, res)
{
    store.get(req.params.id, function(err, note) {
        res.render("index", note);
    });
};

module.exports.deleteNote =  function (req, res)
{
    store.delete(  req.params.id , function(err, note) {
        res.render("index", note);
    });
};