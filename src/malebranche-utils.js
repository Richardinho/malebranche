var xml2js = require('xml2js'),
    util = require('util');

var parser = new xml2js.Parser();

function _isObject(obj) {
	var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
}

function _isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}

function parseStringIntoJs(xml){
	return new Promise(function(resolve, reject){
		parser.parseString(xml, function (err, result) {
			if(err) {
				reject(err);
			} else {
				//console.log('foo',util.inspect(result, false, null));
				resolve(result);
			}
		});
	});
}

/* takes svg object and converts it back into xml string */
function serializeJSIntoString(obj) {
	var builder = new xml2js.Builder();
	return builder.buildObject(obj);
}



exports.isObject = _isObject;
exports.isArray = _isArray;
exports.parseStringIntoJs = parseStringIntoJs;
exports.serializeJSIntoString = serializeJSIntoString;
