const _ = require('lodash');
const trans = require('./trans');
const colors = require('./myColors');
const packageJson = require('../package.json')
;

let _appName = _.get(packageJson, 'name', 'myApp');

module.exports.log = logInfo;
module.exports.info = logInfo;
module.exports.error = logError;
module.exports.warn = logWarning;
module.exports.debug = logDebug;
module.exports.dir = dir;
module.exports.logSuccess = logSuccess;
module.exports.appName = appName;
module.exports.getUtcDate = getUtcDate;

function appName (name) {
  if (name == null) {
    return _appName;
  }

  _appName = name;
}

function logError (err) {
  const message = typeof err === 'string' ? arguments : [err?.message || '', err];
  console.error('%s [%s] [%s] %s',
    appName().bold.danger,
    'Error',
    getUtcDate(),
    ...(_.map(message, trans)),
  )
  ;
}

function logSuccess () {
  console.info('%s [%s] [%s] %s',
    appName().bold.success,
    'Success',
    getUtcDate(),
    ...(_.map(arguments, trans)),
  );
}

function logInfo () {
  console.info('%s [%s] [%s] %s',
    appName().bold.info,
    'Info',
    getUtcDate(),
    ...(_.map(arguments, trans)),
  );
}

function logWarning (err) {
  if (logWarning.doWarn === false) return;
  const message = typeof err === 'string' ? arguments : [err?.message || '', err];
  console.warn('%s [%s] [%s] %s',
    appName().bold.warning,
    'Warning',
    getUtcDate(),
    ...(_.map(message, trans)),
  );
}

function logDebug () {
  if (['test', 'production'].includes(process.env.NODE_ENV)) return;
  console.info('%s [%s] [%s] %s',
    appName().bold.primary,
    'Debug',
    getUtcDate(),
    ...(_.map(arguments, trans)),
  );
}

function dir (message) {
  console.dir(message);
}

function getUtcDate (date = Date.now()) {
  return new Date(date).toLocaleString(undefined, { timeZoneName: 'short' });
}
