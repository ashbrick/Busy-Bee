const express    = require('express');
const router     = express.Router();
const Item       = require('../models/items.js') //needed this to create relationship between dbs
const List       = require('../models/lists.js')

//===================
//      Routes
//===================


//====================
//  New route
//====================
// goes before show route
// sets up a form page called "new item page for new.ejs"
router.get('/new/:id', (req, res) =>{
    //find all of the lists so you can choose the one you want to edit the items of
    // List.find({}, (err, allLists) =>{ //find lists in db
        res.render('./items/new.ejs',
            {
                list: req.params.id //referring to id in url
                // lists:allLists //assign the second parameter to a property so can use squid wizard in ejs
            }
        ); //closing for res.render
    // }); //closing for list.find
    // res.render('./items/new.ejs') // commented out when added list.find to create relationshp between dbs
    // res.send('new'); // making sure it's connected, it works
});

//====================
//  Show route
//====================
router.get('/:id', (req, res) => {
    //req.params.id is referring to :id
    Item.findById(req.params.id, (err, foundItems) => {
        List.findOne({'items._id':req.params.id}, (err, foundList) => {
            res.render('./items/show.ejs',
                {
                    list:foundList,
                    item:foundItems
                }
            )// closing for res.render
        }); // closing for List.findOne
    }); //closing to Item.findById
}); //closing for router.get

//====================
//  Edit route
//====================
router.get('/:id/edit', (req, res) => {
    // res.render('edit.ejs') // displayed edit page form
    // now update to find item by id
    Item.findById(req.params.id, (error, foundItems) => {
        res.render('./items/edit.ejs',
            {
                item:foundItems //squid wizard will populate info based on this var.
            }
        ); //res.render closing
    // console.log(foundItems)
    }); // Item.findById closing
    // res.redirect('/:id') //redirect to show page
}); //router.get closing

//====================
//  Delete route
//====================
// need method-override for this (require it and use it)
router.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/items'); //redirect back to index page
    }); // closing for Item.findByIdAndRemove()

}); // closing for router.delete
//can use curl to check it: curl -X DELETE localhost:3000/items/asdf
//will show page html if route works, then go set up delete form on index.ejs to send a delete request to appropriate route

//====================
//  Update route
//====================
//edit route sends info here
router.put('/:id', (req, res) => {
    // res.redirect('/');
    Item.findByIdAndUpdate(
        req.params.id, //id of the model we want to find and update
        req.body, //comes from properties we want to change that we set up on edit.ejs
        {new: true}, // if this is omitted or set to false, then updateModel below won't change anything, it'll just keep showing the same previous info
        (err, updatedModel) => {
            res.redirect('lists/:id'); //redirect to list show page
        } // closing for (err, updateModel)
    ); // closing for Item.findByIdAndUpdate
    // res.send(req.body); //whatever you type into edit form will show up as an object on submit -- once this works, then set up findByIdAndUpdate() and res.redirect to index
});

//====================
//  Create route
//====================
//for creating data for each item, creates model in database and sends user back to index
//also adds items to existing lists
//make sure you go to new.ejs and add the form action and method
router.post('/', (req, res) =>{
    console.log('running')
    // res.redirect('/'); //back to index
    // res.send(req.body); //shows info typed into form, displays as object on page
    List.findById(req.body.id, (err, foundList) => { // to add item to list, first find the list
        // console.log(err)
        // console.log(foundList)
        // console.log(req.body)
        //then create the item
        Item.create(req.body, (err, createdItem) => { // req.body is showing up, so now create a new document/object that gets added to database and redirects user to index
            // console.log(err)
            // console.log(createdItem)
            [foundList.listItems].push(req.body)
            // foundList.push(createdItem);
            [foundList.listItems].save((err, data) => { //save changes after updating model
            // [req.body.id].push(createdItem); //didn't work
            // [req.body.id].save((err, data) => { //didn't work (logged that [req.body.id].save is not a func)

                // console.log(err)
                res.redirect('/lists/:id'); //redirect to list items index
            }); //closing for foundList.save
        }); //closing for Item.create func
    }); // closing for list.findbyid
}); //closing for router.post

//====================
//  Index route
//====================
//for rendering all items
router.get('/' , (req, res) => {
    Item.find({}, (error, foundItems) =>{ //foundItems can be any name and then assigning it to the variable "items" -- find will return array of objects
        res.render('./items/index.ejs', {
            items:foundItems // the key items becomes var name in index.ejs, items is an array of objects because foundItems is a collection of documents
        });
  // res.send('index page'); //this works
    });
});










module.exports = router;
