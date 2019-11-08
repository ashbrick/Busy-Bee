const mongoose = require('mongoose');
const Item = require('./lists.js');

//creating framework for list creation in database
const listSchema = mongoose.Schema({
    name: String,
    // listItems: [Item.schema]
});

//create variable for List
const List = mongoose.model('List', listSchema);

//export it so it can be accessed as a variable and required by controllers for use in ejs files
module.exports = List;
