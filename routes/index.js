const router = require('express').Router();

const background = require('./background.js');
const creator = require('./creator.js');

router.use('/background', background);
router.use('/creator', creator);

module.exports = router;