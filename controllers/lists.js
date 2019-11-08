const express   = require('express');
const router    = express.Router();
//use the controller for lists.js in server.js
const List      = require('../models/lists.js'); // access schema for List framework so can use in routes

//======> Index route: for rendering all lists
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


//=======> New route: to create new list
router.get('/new', (req, res) => {
    res.render('lists/new.ejs');
}); // closing for router.get -- new route

//=======> Create route: create data for list and send to index
router.post('/', (req, res) => { //send it to index.ejs
    // res.send('received'); // testing the route
    //make sure body-parser middleware is installed for this
    // res.send('req.body') // to see what's in body of request and make sure form is working (req.body is what user types into form)
    List.create(req.body, (err, createdList) => {
        res.redirect('/lists'); //take to list index after creation
    });
});


//======> Show route: for showing individual list



module.exports = router;
