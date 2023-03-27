const Client = require('../client');
const { readFileSync } = require('fs-extra');
const path = require('path');
const setCreationAndModificationDate = readFileSync(path.join(__dirname, '../painless/setCreationAndModificationDate.painless'), 'utf8');

const PIPELINE_ID = 'set_creation_and_modification_date';

module.exports = { putCreationAndModificationDatePipeline, deleteCreationAndModificationDatePipeline };

function deleteCreationAndModificationDatePipeline () {
  const esClient = Client.get();
  return esClient
    .ingest
    .deletePipeline({ id: PIPELINE_ID });
}

function putCreationAndModificationDatePipeline () {
  const esClient = Client.get();
  return esClient
    .ingest
    .putPipeline({
      id: PIPELINE_ID,
      body: {
        description: 'This pipeline set the creation date and/or the modification.',
        processors: [
          {
            script: {
              source: setCreationAndModificationDate,
            },
          },
        ],
      },
    });
}
