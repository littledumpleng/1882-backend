const router = require('express').Router();
const { Genre } = require('../models');

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genres = await Genre.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(genres);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await Genre.create({
      ...req.body,
    });
    res.json('created');
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Genre.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json('updated');
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Genre.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json('deleted');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;