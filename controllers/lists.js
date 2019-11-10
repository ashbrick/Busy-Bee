const express   = require('express');
const router    = express.Router();
//use the controller for lists.js in server.js
const List      = require('../models/lists.js'); // access schema for List framework so can use in routes

//====================
//     Index route: for rendering all lists
//====================
router.get('/', (req, res) => {
    // add List.find() to find everything in this collection
    List.find({}, (err, foundLists) =>{ // create func to find list in db, find() will return array of objects
        res.render('lists/index.ejs', // show index of lists --> this works
            {
                lists: foundLists // lists found in query, the key "lists" will be var name in index.ejs
            }
        )
    }); //closing paren for List.find()
}); // closing for router.get('/') --index route

//====================
//   New route: to create new list
//====================
router.get('/new', (req, res) => {
    res.render('lists/new.ejs');
}); // closing for router.get -- new route

//====================
//   Create route: create data for list and send to index
//====================
router.post('/', (req, res) => { //send it to index.ejs
    // res.send('received'); // testing the route
    //make sure body-parser middleware is installed for this
    // res.send('req.body') // to see what's in body of request and make sure form is working (req.body is what user types into form)
    List.create(req.body, (err, createdList) => {
        res.redirect('/lists'); //take to list index after creation
    }); //closing for List.create
}); //closing for router.post

//====================
//   Show route: for showing individual list
//====================
router.get('/:id', (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        res.render('./lists/show.ejs',
            {
                list:foundList
            }
        ); //res.render closing
    }); //closing for List.findById
}); //closing for router.get

//====================
//  Edit route
//====================
router.get('/:id/edit', (req, res) => {
    // find the list by its id
    List.findById(req.params.id, (err, foundList) => { //finds a list based on its id in the url, once it's found it goes into the second parameter (foundList) and gets passed into the property "list" so that I can refer to it in edit.ejs
        res.render('list/edit.ejs',
            {
                list:foundList // refer to the list with "list" to use squid wizard symbols
            }
        ) // closing for res.render
    }); //closing for List.findById
}); //closing for router.get

//====================
//  Update route: edit route sends info here
//====================
router.put('/:id', (req, res) => {
    List.findByIdAndUpdate(
        req.params.id, // id of the model I want to find and update
        req.body, // comes from properties I set up on edit.ejs file that I want to change
        {new:true}, //if this isn't added then updatedModel won't change, previous info will remain
        (err, updatedModel) => {
            res.redirect('/lists' + updatedModel.id); //back to list show page
        } //closing for err.updatedModel
    ) // closing for List.findByIdAndUpdate
}); // router.put closing
//go add form action on edit.ejs

//====================
//  Delete route
//====================
//need method override for this to work
router.delete('/:id', (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/lists');
    }); // closing for List.findByIdAndRemove
}); //closing for router.delete

module.exports = router;
