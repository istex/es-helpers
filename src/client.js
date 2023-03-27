const { Client } = require('@elastic/elasticsearch');
const defaultLogger = require('../helpers/logger');

module.exports = (function () {
  let instance;

  function createInstance (config, { logger }) {
    const client = new Client(config);
    client.diagnostic.on('response', (err, result) => {
      if (err) {
        const failuresReasons = err?.meta?.body?.failures?.map((failure) => failure?.cause?.reason) || [];
        const failuresTypes = err?.meta?.body?.failures?.map((failure) => failure?.cause?.type) || [];
        err.failuresList = failuresReasons;
        err.failuresTypes = failuresTypes;
        logger?.error(err);

        if (['version_conflict_engine_exception', 'script_exception'].includes(err?.meta?.body?.error?.type)) {
          logger?.error(`[Error details] name: ${err.name}, type: ${err?.meta?.body?.error?.type}, status: ${err?.meta?.body?.status}`);
          logger?.dir(err?.meta?.body?.error);
        }
      }
    });

    return client;
  }

  return {
    get: function (config = {}, { logger = defaultLogger, appName } = {}) {
      logger?.appName(appName);
      if (!instance) {
        instance = createInstance(config, { logger });
      }
      return instance;
    },
  };
})();
