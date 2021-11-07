const express = require('express');
const router = express.Router(); // .Router() is used to create a new router object to handle requests
const db = require('../config/database'); // database; '../' because pulling outside of routes folder 
const Gig = require('../models/Gig'); // model

// get gig list
router.get('/', (req, res) => // since we already pointed '/gigs' to this file, we just need to use '/'
    Gig.findAll() // findAll() is a sequelize method
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200); // 200 ok
    })
    .catch(err => console.log(err)));

// add a gig - ultimately later where we submit the form to as a post request. going to the /gigs/add url inserts this record into the db
router.get('/add', (req, res) => {
    const data = {
        title: 'Simple w=Wordpress website',
        technologies: 'wordpress, php, html, css',
        budget: '$1000',
        description: 'lorem ipsum',
        contact_email: 'fruits@gmail.com'
    }

    let { title, technologies, budget, description, contact_email} = data; // pulling these out of the data object

    // insert into table
    Gig.create({
        title: title, // database column name: variable name
        technologies, // you could format title like this too because they have the same name
        description,
        budget,
        contact_email
    })
        .then(gig => res.redirect('/gigs')) // redirect to gigs afterwards
        .catch(err => console.log(err));
});

module.exports = router;




// res.send('GIGS')); // since we already pointed '/gigs' to this file, we just need to use '/'


// we want this router to ultimately fetch all of the gigs in the db