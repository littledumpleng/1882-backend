const router = require('express').Router();

const creator = require('./creator');
const background = require('./background');
const genre = require('./genre');
const mediaType = require('./mediaType');

router.use('/creator', creator);
router.use('/background', background);
router.use('/genre', genre);
router.use('/mediaType', mediaType);

module.exports = router;