const mongoose = require('mongoose');

//creating framework for to-do items
const itemSchema = new mongoose.Schema({
    // listName: [List.schema],
    toDoItem: { type: String, required: true},
    details: String,
    complete: Boolean
});

// creating an empty array in mongo called Item based on blueprint of properties each item will have (according to schema)
const Item = mongoose.model('Item', itemSchema); // Item creates a collection

module.exports = Item;
