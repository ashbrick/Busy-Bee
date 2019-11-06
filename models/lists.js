const mongoose = require('mongoose');

//creating framework for to-do list items
const listSchema = new mongoose.Schema({
    title: { type: String, required: true},
    details: String,
    complete: Boolean
});

// creating an empty array in mongo called List based on blueprint of properties each item will have (according to schema)
const List = mongoose.model('List', listSchema); // List creates a collection

module.exports = List;
