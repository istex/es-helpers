const Client = require('./client');

module.exports = function deleteIndexIx (indiceName) {
  const esClient = Client.get();
  return esClient
    .indices
    .exists({ index: indiceName })
    .then(({ body: doesExist }) => {
      if (!doesExist) return;
      return esClient
        .indices
        .delete({ index: indiceName });
    });
};
