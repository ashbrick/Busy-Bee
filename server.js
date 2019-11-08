//////// Dependencies
const express         = require('express');
const methodOverride  = require('method-override');
const mongoose        = require ('mongoose');
const app             = express ();
const db              = mongoose.connection;
const itemsController = require('./controllers/items.js')//make sure this const matches the require when creating the new file for controlers
const listsController = require('./controllers/lists.js')
const Item            = require('./models/items.js')
require('dotenv').config()

//////// Port
const PORT = process.env.PORT // allows use of Heroku's port
console.log(PORT);

//////// Database
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)

mongoose.connect(MONGODB_URI , { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true }
);

///////// Error / Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//////// Middleware
app.use(express.static('public')); //use public folder for static assets

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// going to need this to create new lists and list items, so include after setting up index for list items and lists 
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form, need it to use req.body
app.use('/lists', listsController);
app.use('/items', itemsController); //specifies when middleware runs, so since using this you can take off the /items from the urls in the routes but not for the redirects


//////////// Routes

//=====> Home Route
app.get('/', (req, res) => {
    res.render('home.ejs')
});

//======> New Route
// sets up a form page called Start New List (begin.ejs)
// should take you to begin.ejs form
app.get('/newlist', (req, res) => {
    res.render('./items/begin.ejs')
});


//======> Update Route


//=====> Create Route
app.post('/list-index', (req, res) => {
List.create(req.body, (err, createdList) => {
    res.redirect('/list-index')
    });
});

//>>>>>>>> Lists-Index >>>>>>>>>>>
//for rendering all list items
app.get('/lists-index' , (req, res) => {
    List.find({}, (error, allItems) =>{ //allItems can be any name and then assigning it to the variable "lists" -- find will return array of objects
        res.render('lists-index.ejs', {
            lists:allItems // the key lists become var name in index.ejs, lists is an array of objects because allItems is a collection of documents
        });
  // res.send('index page'); //this works
    });
});

//////// Listener
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
