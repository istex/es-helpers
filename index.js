module.exports = {
  getClient: require('./src/client').get,
  createIndexNx: require('./src/createIndexNx'),
  deleteIndexIx: require('./src/deleteIndexIx'),
  pipelines: require('./src/pipelines/pipelines'),
};
