const { sequelize, MediaMediaType, MediaGenre, MediaTheme, MediaBackground } = require('../models');

const utils = {};

utils.addMediaTypesForMedia = async ({ mediaId, mediaTypeIds }) => {
  for (const mediaTypeId of mediaTypeIds) {
    await MediaMediaType.create({
      mediaId,
      mediaTypeId
    });
  }
}

utils.updateMediaTypesForMedia = async ({ mediaId, mediaTypeIds }) => {
  await MediaMediaType.destroy({
    where: {
      mediaId
    }
  });
  await utils.addMediaTypesForMedia({ mediaId, mediaTypeIds });
}

utils.addGenresForMedia = async ({ mediaId, genreIds }) => {
  for (const genreId of genreIds) {
    await MediaGenre.create({
      mediaId,
      genreId
    });
  }
}

utils.updateGenresForMedia = async ({ mediaId, genreIds }) => {
  await MediaGenre.destroy({
    where: {
      mediaId
    }
  });
  await utils.addGenresForMedia({ mediaId, genreIds });
}

utils.addThemesForMedia = async ({ mediaId, themeIds }) => {
  for (const themeId of themeIds) {
    await MediaTheme.create({
      mediaId,
      themeId
    });
  }
}

utils.updateThemesForMedia = async ({ mediaId, themeIds }) => {
  await MediaTheme.destroy({
    where: {
      mediaId
    }
  });
  await utils.addThemesForMedia({ mediaId, themeIds });
}

utils.addBackgroundsForMedia = async ({ mediaId, backgroundIds }) => {
  for (const backgroundId of backgroundIds) {
    await MediaBackground.create({
      mediaId,
      backgroundId
    });
  }
}

utils.updateBackgroundsForMedia = async ({ mediaId, backgroundIds }) => {
  await MediaBackground.destroy({
    where: {
      mediaId
    }
  });
  await utils.addBackgroundsForMedia({ mediaId, backgroundIds });
}

utils.getMediaTypesForMedia = async ({ mediaIds }) => {
  const mediaTypes = await sequelize.query(`
    SELECT mt.id, mt.name, mmt."mediaId"
    FROM "MediaMediaTypes" mmt
    INNER JOIN "MediaTypes" mt ON mmt."mediaTypeId" = mt.id
    WHERE mmt."mediaId" in (${mediaIds.join(', ')})
  `);
  return mediaTypes[0];
}

utils.getGenresForMedia = async ({ mediaIds }) => {
  const genres = await sequelize.query(`
    SELECT g.id, g.name, mg."mediaId"
    FROM "MediaGenres" mg
    INNER JOIN "Genres" g ON mg."genreId" = g.id
    WHERE mg."mediaId" in (${mediaIds.join(', ')})
  `);
  return genres[0];
}

utils.getThemesForMedia = async ({ mediaIds }) => {
  const themes = await sequelize.query(`
    SELECT t.id, t.name, mt."mediaId"
    FROM "MediaThemes" mt
    INNER JOIN "Themes" t ON mt."themeId" = t.id
    WHERE mt."mediaId" in (${mediaIds.join(', ')})
  `);
  return themes[0];
}

utils.getBackgroundsForMedia = async ({ mediaIds }) => {
  const backgrounds = await sequelize.query(`
  SELECT b.id, b.name, mb."mediaId"
  FROM "MediaBackgrounds" mb
  INNER JOIN "Backgrounds" b ON mb."backgroundId" = b.id
  WHERE mb."mediaId" in (${mediaIds.join(', ')})
  `);
  return backgrounds[0];
}

module.exports = utils;
