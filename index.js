const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const Parser = require('./src/parser');
const schema = require('./src/schema.json');

module.exports = function mdLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const options = loaderUtils.getOptions(this);
  validateOptions(schema, options, {
    name: 'md-loader',
    baseDataPath: 'options'
  });

  return new Parser(options).parse(source, this);
};
