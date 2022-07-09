const router = require('express').Router();

const creator = require('./creator.js');
const background = require('./background.js');
const genre = require('./genre.js');

router.use('/creator', creator);
router.use('/background', background);
router.use('/genre', genre);

module.exports = router;