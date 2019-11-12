const mongoose = require('mongoose');
const Item = require('./lists.js'); //make sure that lists can access Item by assigning it a variable and requiring it
//
// //creating framework for list creation in database
const listSchema = new mongoose.Schema(
    {
        listName: String, //don't forget the comma!
        // toDoItem: {type: String, details: String, complete: Boolean, required: true},
        listItems: [Item] //add the items array so that lists can access the items data
    }
);

//create variable for List
const List = mongoose.model('List', listSchema);

//export it so it can be accessed as a variable and required by controllers for use in ejs files
module.exports = List;
