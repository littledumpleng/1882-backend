const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router(); // .Router() is used to create a new router object to handle requests
const db = require('../config/database'); // database; '../' because pulling outside of routes folder 
const Gig = require('../models/Gig'); // model
const Sequelize = require('Sequelize');
const Op = Sequelize.Op; // access to operations such as like

// get gig list
router.get('/', (req, res) => {// since we already pointed '/gigs' to this file, we just need to use '/'
    
    const searchTerm = req.query.searchTerm;
    const genre = req.query.genre;
    const mediaType = req.query.mediaType;
    const author = req.query.author;
    console.log("searchTerm", searchTerm);

    const queryParams = {
        where: {}
    };

    if (searchTerm) {
        queryParams.where[Op.or]= [
        
        {description:{
                [Op.like]: `%${searchTerm}%`
              }
            },

        {title: {
        [Op.like]: `%${searchTerm}%`
        }
    }
];
        
    }
Gig.findAll(queryParams) // findAll() is a sequelize method to find gigs
        .then(gigs => {
            res.json(gigs) // sends gigs as json
        })
        .catch(err => console.log(err))
    });

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

// search for gigs
router.get('/search', (req, res) => {
    const { term } = req.query; // destructuring pulls the term out of req.query

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } }) // find all gigs where column name, technologies, is %anything term-related %anything
        .then(gigs => res.render('gigs', { gigs })) // gives gigs filtered to the search term and renders gigs view
        .catch(err => console.log(err));
});

module.exports = router;