const Client = require('./client');

module.exports = function createIndexNx (indiceName, indiceConfig = {}) {
  const esClient = Client.get();
  return esClient
    .indices
    .exists({ index: indiceName })
    .then((doesExist) => {
      if (doesExist) return;
      return esClient
        .indices
        .create(
          {
            index: indiceName,
            body: indiceConfig,
          },
        );
    });
};
