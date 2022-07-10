const router = require('express').Router();
const { Media, MediaMediaType } = require('../models');

router.get('/', async (req, res) => {
  try {
    const medias = await Media.findAll();
    res.json(medias);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const medias = await Media.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(medias);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const { title, description, releaseDate, mediaTypeIds } = req.body
  try {
    const media = await Media.create({
      title,
      description,
      releaseDate
    });

    if (mediaTypeIds) {
      for (const mediaTypeId of mediaTypeIds) {
        await MediaMediaType.create({
          mediaId: media.id,
          mediaTypeId
        });
      }
    }
    res.json('created');
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Media.update(
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
    await Media.destroy({
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