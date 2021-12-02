const express = require('express');
const router = express.Router(); // .Router() is used to create a new router object to handle requests
const db = require('../config/database'); // database; '../' because pulling outside of routes folder 
const Gig = require('../models/Gig'); // model

// get gig list
router.get('/', (req, res) => // since we already pointed '/gigs' to this file, we just need to use '/'
    Gig.findAll() // findAll() is a sequelize method to find gigs
        .then(gigs => {
            res.json(gigs) // sends gigs as json
        })
        .catch(err => console.log(err)));

// add a gig - ultimately later where we submit the form to as a post request. going to the /gigs/add url inserts this record into the db
router.post('/add', (req, res) => {
    const data = {
        title: req.body.title,
        technologies: req.body.technologies,
        budget: req.body.budget,
        description: req.body.description,
        contact_email: req.body.contact_email
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