const router = require('express').Router();
const { Background } = require('../models');

router.get('/', async (req, res) => {
  try {
    const background = await Background.findAll();
    res.json(background);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const background = await Background.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(background);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await Background.create({
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
    await Background.update(
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
    await Background.destroy({
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