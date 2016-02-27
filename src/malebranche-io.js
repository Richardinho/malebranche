var fs = require('fs')

function readFile(srcFile) {
	return new Promise(function(resolve, reject){
		fs.readFile(srcFile, function(err, data) {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function writeFile(contents) {
	return new Promise(function(resolve, reject){
		fs.writeFile(__dirname + '/../destination.svg', contents, function(err) {
			if(err) {
				reject(err);
			} else {
				resolve();
			}
	  });
	});
}

exports.readFile = readFile;
exports.writeFile = writeFile;