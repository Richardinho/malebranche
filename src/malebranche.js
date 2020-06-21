var malebrancheLib = require('malebranche-lib');
var malebrancheIO = require('./malebranche-io.js');

var readFile = malebrancheIO.readFile;
var writeFile = malebrancheIO.writeFile;

function errorHandler(error) {
  console.log('error', error);
}

exports.main = function(srcFile, name, decimalPlaces) {
  const options = {};

  if (decimalPlaces) {
    options.decimalPlaces = decimalPlaces;
  }

  readFile(srcFile)
    .then((src) => {
      return malebrancheLib.transform(src, options);
    })
    .then(writeFile.bind(null, name))
    .catch(errorHandler);
};



