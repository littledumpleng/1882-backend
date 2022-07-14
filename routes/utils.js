const { sequelize, MediaMediaType, MediaGenre, MediaTheme, MediaBackground, MediaCreatorRole } = require('../models');

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

utils.addCreatorRoleForMedia = async ({ mediaId, creatorRoles }) => {
  for (const creatorRole of creatorRoles) {
    await MediaCreatorRole.create({
      mediaId,
      creatorId: creatorRole.creatorId,
      roleId: creatorRole.roleId,
    });
  }
}

utils.updateCreatorRoleForMedia = async ({ mediaId, creatorRoles }) => {
  await MediaCreatorRole.destroy({
    where: {
      mediaId
    }
  });
  await utils.addCreatorRoleForMedia({ mediaId, creatorRoles });
}

utils.getMediaTypesForMedia = async ({ mediaIds }) => {
  const mediaTypes = await sequelize.query(`
    SELECT mt.id, mt.name, mmt."mediaId"
    FROM "MediaMediaTypes" mmt
    INNER JOIN "MediaTypes" mt ON mmt."mediaTypeId" = mt.id
    WHERE mmt."mediaId" IN (${mediaIds.join(', ')})
  `);
  return mediaTypes[0];
}

utils.getGenresForMedia = async ({ mediaIds }) => {
  const genres = await sequelize.query(`
    SELECT g.id, g.name, mg."mediaId"
    FROM "MediaGenres" mg
    INNER JOIN "Genres" g ON mg."genreId" = g.id
    WHERE mg."mediaId" IN (${mediaIds.join(', ')})
  `);
  return genres[0];
}

utils.getThemesForMedia = async ({ mediaIds }) => {
  const themes = await sequelize.query(`
    SELECT t.id, t.name, mt."mediaId"
    FROM "MediaThemes" mt
    INNER JOIN "Themes" t ON mt."themeId" = t.id
    WHERE mt."mediaId" IN (${mediaIds.join(', ')})
  `);
  return themes[0];
}

utils.getBackgroundsForMedia = async ({ mediaIds }) => {
  const backgrounds = await sequelize.query(`
  SELECT b.id, b.name, mb."mediaId"
  FROM "MediaBackgrounds" mb
  INNER JOIN "Backgrounds" b ON mb."backgroundId" = b.id
  WHERE mb."mediaId" IN (${mediaIds.join(', ')})
  `);
  return backgrounds[0];
}

utils.getCreatorRoleForMedia = async ({ mediaIds }) => {
  const creatorRoles = await sequelize.query(`
    SELECT mcr.*, c."firstName", c."lastName", r.name AS "roleName"
    FROM "MediaCreatorRoles" mcr
    INNER JOIN "Creators" c ON mcr."creatorId" = c.id
    INNER JOIN "Roles" r ON mcr."roleId" = r.id
    WHERE mcr."mediaId" IN (${mediaIds.join(', ')})
  `);
  return creatorRoles[0];
}

module.exports = utils;
