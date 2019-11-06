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
    res.send(req.body); //shows info typed into form, displays as object on page
});

//>>>>>>>> Index >>>>>>>>>>>
//for rendering all list items
router.get('/' , (req, res) => {
        res.render('./lists/index.ejs', {
            lists:allItems // the key lists become var name in index.ejs, lists is an array of objects because allItems is a collection of documents
        });
  // res.send('index page'); //this works
});

//>>>>>>>> Show >>>>>>>>>>>
router.get('/:id', (req, res) => {
    res.render('show.ejs')
});

//>>>>>>>> Delete >>>>>>>>>>>
router.delete('/:id', (req, res) => {
    res.redirect('/')
});
//can use curl to check it: curl -X DELETE localhost:3000/lists/asdf
//will show page html if route works, then go set up delete form on index.ejs to send a delete request to appropriate route

//>>>>>>>> Edit >>>>>>>>>>>
router.get('/:id/edit', (req, res) => {
    res.render('edit.ejs')
});

//>>>>>>>> Update >>>>>>>>>>>
//edit route sends info here
router.put('/:id', (req, res) => {
    // res.redirect('/');
    res.send(req.body); //whatever you type into edit form will show up as an object on submit -- once this works, then set up findByIdAndUpdate() and res.redirect to index
});



module.exports = router;
