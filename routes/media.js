const router = require('express').Router();
const { Media, sequelize } = require('../models');
const { addMediaTypesForMedia, updateMediaTypesForMedia, addGenresForMedia, updateGenresForMedia } = require('./utils');

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

    const mediaTypes = await sequelize.query(`
      SELECT mt.id, mt.name
      FROM "MediaMediaTypes" mmt
      INNER JOIN "MediaTypes" mt ON mmt."mediaTypeId" = mt.id
      WHERE mmt."mediaId" = ${req.params.id}
    `);

    const genres = await sequelize.query(`
      SELECT g.id, g.name
      FROM "MediaGenres" mg
      INNER JOIN "Genres" g ON mg."genreId" = g.id
      WHERE mg."mediaId" = ${req.params.id}
    `);

    res.json({
      ...medias.dataValues,
      mediaTypes: mediaTypes[0],
      genres: genres[0]
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const { title, description, releaseDate, mediaTypeIds, genreIds } = req.body
  try {
    const media = await Media.create({
      title,
      description,
      releaseDate
    });

    if (mediaTypeIds) {
      await addMediaTypesForMedia({
        mediaId: media.id,
        mediaTypeIds
      })
    }

    if (genreIds) {
      await addGenresForMedia({
        mediaId: media.id,
        genreIds
      })
    }

    res.json('created');
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, releaseDate, mediaTypeIds, genreIds } = req.body
  try {
    await Media.update(
      {
        title,
        description,
        releaseDate
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (mediaTypeIds) {
      await updateMediaTypesForMedia({
        mediaId: req.params.id,
        mediaTypeIds
      })
    }

    if (genreIds) {
      await updateGenresForMedia({
        mediaId: req.params.id,
        genreIds
      })
    }

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