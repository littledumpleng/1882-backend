const express = require('express');
const router = express.Router(); // .Router() is used to create a new router object to handle requests
const db = require('../config/database'); // database; '../' because pulling outside of routes folder 
const Gig = require('../models/Gig'); // model

router.get('/', (req, res) => // since we already pointed '/gigs' to this file, we just need to use '/'
    Gig.findAll() // findAll() is a sequelize method
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200); // 200 ok
    })
    .catch(err => console.log(err)));

module.exports = router;




// res.send('GIGS')); // since we already pointed '/gigs' to this file, we just need to use '/'


// we want this router to ultimately fetch all of the gigs in the db