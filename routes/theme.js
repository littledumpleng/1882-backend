const router = require('express').Router();
const { Theme } = require('../models');

router.get('/', async (req, res) => {
  try {
    const themes = await Theme.findAll();
    res.json(themes);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const themes = await Theme.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(themes);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await Theme.create({
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
    await Theme.update(
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
    await Theme.destroy({
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