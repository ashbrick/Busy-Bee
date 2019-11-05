//////// Dependencies
const express         = require('express');
const methodOverride  = require('method-override');
const mongoose        = require ('mongoose');
const app             = express ();
const db              = mongoose.connection;
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
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

///////// Routes
app.get('/' , (req, res) => {
  res.send('Hello World!');
});


//////// Listener
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
