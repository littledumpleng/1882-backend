const { MediaMediaType, MediaGenre, MediaTheme, MediaBackground } = require('../models');

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

module.exports = utils;
