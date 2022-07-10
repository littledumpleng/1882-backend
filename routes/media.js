const router = require('express').Router();
const { Media, sequelize } = require('../models');
const { addMediaTypesForMedia, updateMediaTypesForMedia, addGenresForMedia, updateGenresForMedia, addThemesForMedia, updateThemesForMedia, addBackgroundsForMedia, updateBackgroundsForMedia } = require('./utils');

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

    const themes = await sequelize.query(`
      SELECT t.id, t.name
      FROM "MediaThemes" mt
      INNER JOIN "Themes" t ON mt."themeId" = t.id
      WHERE mt."mediaId" = ${req.params.id}
    `);

    const backgrounds = await sequelize.query(`
      SELECT b.id, b.name
      FROM "MediaBackgrounds" mb
      INNER JOIN "Backgrounds" b ON mb."backgroundId" = b.id
      WHERE mb."mediaId" = ${req.params.id}
    `);

    res.json({
      ...medias.dataValues,
      mediaTypes: mediaTypes[0],
      genres: genres[0],
      themes: themes[0],
      backgrounds: backgrounds[0],
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const { title, description, releaseDate, mediaTypeIds, genreIds, themeIds, backgroundIds } = req.body
  try {
    const media = await Media.create({
      title,
      description,
      releaseDate: releaseDate !== '' ? releaseDate : null
    });

    if (mediaTypeIds) {
      await addMediaTypesForMedia({
        mediaId: media.id,
        mediaTypeIds
      });
    }

    if (genreIds) {
      await addGenresForMedia({
        mediaId: media.id,
        genreIds
      });
    }

    if (themeIds) {
      await addThemeForMedia({
        mediaId: media.id,
        themeIds
      });
    }

    if (backgroundIds) {
      await addBackgroundForMedia({
        mediaId: media.id,
        backgroundIds
      });
    }

    res.json('created');
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, releaseDate, mediaTypeIds, genreIds, themeIds, backgroundIds } = req.body
  try {
    await Media.update(
      {
        title,
        description,
        releaseDate: releaseDate !== '' ? releaseDate : null
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
      });
    }

    if (genreIds) {
      await updateGenresForMedia({
        mediaId: req.params.id,
        genreIds
      });
    }

    if (themeIds) {
      await updateThemesForMedia({
        mediaId: req.params.id,
        themeIds
      });
    }

    if (backgroundIds) {
      await updateBackgroundsForMedia({
        mediaId: req.params.id,
        backgroundIds
      });
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