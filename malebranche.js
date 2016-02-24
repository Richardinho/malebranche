
var malebrancheUtils = require('./malebranche-utils.js'),
    malebrancheIO = require('./malebranche-io.js');

var _isArray = malebrancheUtils.isArray;
var _isObject = malebrancheUtils.isObject;
var parseStringIntoJs = malebrancheUtils.parseStringIntoJs;
var serializeJSIntoString = malebrancheUtils.serializeJSIntoString;
var readFile = malebrancheIO.readFile;
var writeFile = malebrancheIO.writeFile;

/*
	The idea here is to change the coords within svgObj in place.
*/
function forEachClipPath(svgObj, callback) {
	// find all clip paths within xml and call call back on all of them
	if(_isArray(svgObj)) {
		// handle as array
		for(var i = 0; i < svgObj.length; i++) {
			forEachClipPath(svgObj[i], callback);
		}
	} else if(_isObject(svgObj)) {
		for(var prop in svgObj) {
			if(svgObj.hasOwnProperty(prop)) {
				var propertyVal = svgObj[prop];
				if( prop === 'clipPath') {
					callback(propertyVal);
				} else {
					forEachClipPath(propertyVal, callback);
				}
			}
		}
		//  handle as object
	} else {
		//  do something else.
	}
}

//  this will change the coords of the clip path from asbolute to fractional
function changeClipPathCoords(clipPath) {

}

function convertCoords(result) {
	forEachClipPath(result, changeClipPathCoords);
	return result;
	//console.log('foo',util.inspect(result, false, null));
}

function errorHandler(error) {
	console.log('error', error);
}

var srcFile = process.argv[2];

readFile(srcFile)
	.then(parseStringIntoJs)
	.then(convertCoords)
	.then(serializeJSIntoString)
	.then(writeFile)
	.catch(errorHandler);

//  export for testing
exports._forEachClipPath = forEachClipPath;



