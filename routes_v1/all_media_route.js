const express = require('express');
const router = express.Router(); // .Router() is used to create a new router object to handle requests
const db = require('../config/database'); // database; '../' because pulling outside of routes folder 
const Gig = require('../models/Gig'); // model
const Media = require('../models/all_media');

router.get('/', (req, res) => 
    Media.findAll()
      // maybe pull data from different tables and display together w/o using many to many rltnship?
      // const media = await db.Media.findAll({ include: db.Themes });
      .then(all_media_route => {
        res.json(all_media_route) // sends all_media as json
    })
    .catch(err => console.log(err)));


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
        title,
        technologies,
        description,
        budget,
        contact_email
    })
        .then(gig => res.json(gig))
        .catch(err => console.log(err));
});

module.exports = router;