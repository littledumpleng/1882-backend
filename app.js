const express = require('express');
const exphbs = require('express-handlebars'); // express template engine to display html and include dynamic conten
const bodyParser = require('body-parser'); // parses the incoming request bodies in a middleware (function that receives request and response objects) before you handle it
const path = require('path'); // deals with filepaths
const app = express(); // initialize app

// database
const db = require('./config/database');


// test db 
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))


app.get('/', (req, res) => res.send('INDEX')); // create index route that catches get request

const PORT = process.env.Port || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`)); // runs server


// NEW MODULE

// const db = require('.config/database');