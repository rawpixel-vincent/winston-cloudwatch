const stringify = require('fast-safe-stringify');

function handleErrorObject(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function _stringify(o) {
  // @ts-ignore
  return stringify(o, handleErrorObject, '  ', {
    depthLimit: 25,
    edgesLimit: 25,
  });
}

function debug() {
  if (!process.env.WINSTON_CLOUDWATCH_DEBUG) {
    return;
  }
  console.log.apply(console, arguments);
}

module.exports = {
  stringify: _stringify,
  debug: debug,
};
