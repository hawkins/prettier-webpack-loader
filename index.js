const prettier = require("prettier");
const loaderUtils = require("loader-utils");
const fs = require("fs");

module.exports = function(source, map) {
  const options = Object.assign({}, loaderUtils.getOptions(this));
  const callback = this.async();
  this.cacheable();

  // TODO: prettier.check(source) here?
  const prettierSource = prettier.format(source, options);

  if (prettierSource !== source) {
    try {
      fs.writeFileSync(this.resourcePath, prettierSource);
    } catch (error) {
      return callback(error);
    }
  }

  return callback(null, prettierSource, map);
};
