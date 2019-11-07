const express = require('express');
const router  = express.Router();
const List = require('../models/lists.js')

//===================
//      Routes
//===================


//>>>>>>>> New >>>>>>>>>>> //put before show route
//sets up a form page called "new list page for new.ejs"
router.get('/new', (req, res) =>{
    res.render('./lists/new.ejs')
    // res.send('new'); // making sure it's connected, it works
});

//>>>>>>>> Create >>>>>>>>>>>
//for creating data for each list item, , creates model in database and sends user back to index
//make sure you go to new.ejs and add the form action and method
router.post('/', (req, res) =>{
    // res.redirect('/'); //back to index
    // res.send(req.body); //shows info typed into form, displays as object on page
    // req.body is showing up, so now create a new document/object that gets added to database and redirects user to index
    List.create(req.body, (err, createdList) =>{
        res.redirect('/lists');
    }) //closing for List.create func
}); //closing for router.post

//>>>>>>>> Index >>>>>>>>>>>
//for rendering all list items
router.get('/' , (req, res) => {
    List.find({}, (error, allItems) =>{ //allItems can be any name and then assigning it to the variable "lists" -- find will return array of objects
        res.render('./lists/index.ejs', {
            lists:allItems // the key lists become var name in index.ejs, lists is an array of objects because allItems is a collection of documents
        });
  // res.send('index page'); //this works
    });
});

//>>>>>>>> Show >>>>>>>>>>>
router.get('/:id', (req, res) => {
    //req.params.id is referring to :id
    List.findById(req.params.id, (err, foundList) => {
        res.render('./lists/show.ejs',
            {
                list:foundList
            }
        ) // closing for res.render
    }); //closing to List.findById
}); //closing for router.get

//>>>>>>>> Delete >>>>>>>>>>>
// need method-override for this (require it and use it)
router.delete('/:id', (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/lists'); //redirect back to index page
    }); // closing for List.findByIdAndRemove()

}); // closing for router.delete
//can use curl to check it: curl -X DELETE localhost:3000/lists/asdf
//will show page html if route works, then go set up delete form on index.ejs to send a delete request to appropriate route

//>>>>>>>> Edit >>>>>>>>>>>
router.get('/:id/edit', (req, res) => {
    // res.render('edit.ejs') // displayed edit page form
    // now update to find item by id
    List.findById(req.params.id, (error, foundList) => {
        res.render('./lists/edit.ejs',{
            list:foundList //squid wizard will populate info based on this var.
        }) //res.render closing
    }); // List.findById closing
    // res.redirect('/:id') //redirect to show page
}); //router.get closing

//>>>>>>>> Update >>>>>>>>>>>
//edit route sends info here
router.put('/:id', (req, res) => {
    // res.redirect('/');
    List.findByIdAndUpdate(
        req.params.id, //id of the model we want to find and update
        req.body, //comes from properties we want to change that we set up on edit.ejs
        {new: true}, // if this is omitted or set to false, then updateModel below won't change anything, it'll just keep showing the same previous info
        (err, updatedModel) => {
            res.redirect('/lists/' + updatedModel.id); //redirect to show page
        } // closing for (err, updateModel)
    ); // closing for List.findByIdAndUpdate
    // res.send(req.body); //whatever you type into edit form will show up as an object on submit -- once this works, then set up findByIdAndUpdate() and res.redirect to index
});



module.exports = router;
