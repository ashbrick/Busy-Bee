const mongoose = require('mongoose');
const List     = require('./lists.js'); // allow items to access my list info so I can add the list array

//creating framework for to-do items
const itemSchema = new mongoose.Schema({
    // listName: [List.schema], // since List is an array of objects, I can use dot notation to call its framework to be pulled in
    toDoItem: String,
    details: String,
    complete: Boolean
});

// creating an empty array in mongo called Item based on blueprint of properties each item will have (according to schema)
const Item = mongoose.model('Item', itemSchema); // Item creates a collection

module.exports = Item;
