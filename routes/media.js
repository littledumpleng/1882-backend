const router = require('express').Router();
const { Media, sequelize } = require('../models');
const { addMediaTypesForMedia, updateMediaTypesForMedia, addGenresForMedia, updateGenresForMedia, addThemesForMedia, updateThemesForMedia, addBackgroundsForMedia, updateBackgroundsForMedia, getMediaTypesForMedia, getGenresForMedia, getThemesForMedia, getBackgroundsForMedia } = require('./utils');

router.get('/', async (req, res) => {
  const { searchTerm, mediaTypeIds, backgroundIds, genreIds, themeIds } = req.query;
  try {

    const select = `SELECT m.*`;

    const from = `FROM "Media" m`

    let join = '';
    let where = 'WHERE m.id IS NOT null';
    if (mediaTypeIds) {
      join += ' INNER JOIN "MediaMediaTypes" mtt ON mtt."mediaId" = m.id';
      where += ` AND mtt."mediaTypeId" IN (${mediaTypeIds.join(', ')})`;
    }

    if (backgroundIds) {
      join += ' INNER JOIN "MediaBackgrounds" mb ON mb."mediaId" = m.id';
      where += ` AND mb."backgroundId" IN (${backgroundIds.join(', ')})`;
    }

    if (genreIds) {
      join += ' INNER JOIN "MediaGenres" mg ON mg."mediaId" = m.id';
      where += ` AND mg."genreId" IN (${genreIds.join(', ')})`;
    }

    if (themeIds) {
      join += ' INNER JOIN "MediaThemes" mt ON mt."mediaId" = m.id';
      where += ` AND mt."themeId" IN (${themeIds.join(', ')})`;
    }

    if (searchTerm) {
      where += ` AND m.title LIKE '%${searchTerm}%'`;
    }

    const groupby = 'GROUP BY m.id'

    const queryString = `${select} ${from} ${join} ${where} ${groupby} `;
    const medias = await sequelize.query(queryString);

    const mediaById = {};
    for (const media of medias[0]) {
      mediaById[media.id] = media;
    }

    const mediaIds = Object.keys(mediaById);

    if (mediaIds.length > 0) {
      const mediaTypes = await getMediaTypesForMedia({ mediaIds });
      for (const mediaType of mediaTypes) {
        const media = mediaById[mediaType.mediaId];
        media.mediaTypes = media.mediaTypes ?? [];
        media.mediaTypes.push(mediaType);
      }

      const genres = await getGenresForMedia({ mediaIds });
      for (const genre of genres) {
        const media = mediaById[genre.mediaId];
        media.genres = media.genres ?? [];
        media.genres.push(genre);
      }

      const themes = await getThemesForMedia({ mediaIds });
      for (const theme of themes) {
        const media = mediaById[theme.mediaId];
        media.themes = media.themes ?? [];
        media.themes.push(theme);
      }

      const backgrounds = await getBackgroundsForMedia({ mediaIds });
      for (const background of backgrounds) {
        const media = mediaById[background.mediaId];
        media.backgrounds = media.backgrounds ?? [];
        media.backgrounds.push(background);
      }
    }

    const results = Object.values(mediaById);
    res.json(results);
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

    const mediaTypes = await getMediaTypesForMedia({ mediaIds: [req.params.id] });

    const genres = await getGenresForMedia({ mediaIds: [req.params.id] });

    const themes = await getThemesForMedia({ mediaIds: [req.params.id] });

    const backgrounds = await getBackgroundsForMedia({ mediaIds: [req.params.id] });

    res.json({
      ...medias.dataValues,
      mediaTypes,
      genres,
      themes,
      backgrounds,
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
      await addThemesForMedia({
        mediaId: media.id,
        themeIds
      });
    }

    if (backgroundIds) {
      await addBackgroundsForMedia({
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