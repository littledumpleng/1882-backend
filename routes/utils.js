const { MediaMediaType, MediaGenre } = require('../models');

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

module.exports = utils;
