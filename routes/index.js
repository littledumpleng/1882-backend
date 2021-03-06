const router = require('express').Router();

const creator = require('./creator');
const background = require('./background');
const genre = require('./genre');
const mediaType = require('./mediaType');
const role = require('./role');
const theme = require('./theme');
const media = require('./media');

router.use('/creator', creator);
router.use('/background', background);
router.use('/genre', genre);
router.use('/mediaType', mediaType);
router.use('/role', role);
router.use('/theme', theme);
router.use('/media', media);

module.exports = router;