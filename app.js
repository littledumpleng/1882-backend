const express = require('express');
const exphbs = require('express-handlebars'); // express template engine to display html and include dynamic conten
const bodyParser = require('body-parser'); // parses the incoming request bodies in a middleware (function that receives request and response objects) before you handle it
const path = require('path'); // deals with filepaths
const app = express(); // initialize app
const { Sequelize } = require('sequelize');

// database

// FORMAT 1: const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
const db = new Sequelize('postgres://lauren_eng:xTg9BV@localhost:5432/database_1882') 

// FORMAT 2:
// const db = new Sequelize('database_1882', 'lauren_eng', 'xTg9BV', {
//         host: 'localhost',
//         dialect: 'postgres'
// }); 

// test db 
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))


app.get('/', (req, res) => res.send('INDEX')); // create index route that catches get request

const PORT = process.env.Port || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`)); // runs server