const router = require('express').Router();

const creator = require('./creator.js');

router.use('/creator', creator);

module.exports = router;