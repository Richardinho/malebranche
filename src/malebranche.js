var malebrancheLib = require('malebranche-lib');
var malebrancheIO = require('./malebranche-io.js');

var readFile = malebrancheIO.readFile;
var writeFile = malebrancheIO.writeFile;

function errorHandler(error) {
  console.log('error', error);
}

exports.main = function(srcFile, name, hRefLength, vRefLength, minX, minY) {
  readFile(srcFile)
    .then((src) => {
      return malebrancheLib.transform(src, hRefLength, vRefLength, {
        minX,
        minY,
      });
    })
    .then(writeFile.bind(null, name))
    .catch(errorHandler);
};



