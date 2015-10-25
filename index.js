
var parse  = require('svg-path-parser');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var util = require('util');

var comma = ',';
var space = '\u0020';

exports.handlePolygon = function() {


}
exports.handleText = function () {}

exports.handlePolyLine = function () {};

exports.handleCircle = function () {};

exports.handleRectangle = function () {};

exports.handleUse = function () {};

exports.handleLine = function () {};

//  handle paths
exports._handlePathElement = function (pathArray) {
	//  extract path string form path element
	var path = pathArray[0]['$']['d'];
	var convertedPath = this.handlePath(path);
	pathArray[0]['$']['d'] = convertedPath;
}

exports.handlePath = function (path) {
	var pathCommands = parse(path);
	//  transform coords from absolute into proportionate
	return this.serialize(pathCommands);
}

exports.serialize = function (commands) {
	var path = '';
	for(var i=0; i < commands.length; i++) {
		path += this._handleCommand(commands[i]) + space;
	}
	return compact(path.trim());
}

// remove superflous commas, add newlines if appropriate todo
// hoping to use sVGO for this. Maybe.
function compact(path) {
	return path;
}
exports._handleM = function (command) {
	return 'M' + command.x + comma + command.y;
};
exports._handleRelativeM = function (command) {
	return 'm' + command.x + comma + command.y;
};
exports._handleL = function (command) {
	return 'L' + command.x + comma + command.y;
};
exports._handleRelativeL = function (command) {
	return 'l' + command.x + comma + command.y;
};

exports._handleCommand = function(command) {
	var result;
	switch(command.code) {
	case 'M' :
		// handle M
		result = this._handleM(command);
		break;
	case 'm' : 
		// handle m
		result = this._handleRelativeM(command); 
		break;
	case 'L' : 
		// handle L
		result = this._handleL(command);
		break;
	case 'l' : 
		// handle l
		result = this._handleRelativeL(command);
		break;
	default:
		throw {
			name : 'unrecognised path code'
		}
	}
	return result;
}


exports.printModuleName = function () {
	console.log('this is Malebranche');
};
exports.name = 'malebranche';

exports.convertClipPath = function (clipPath) {
	//  clipPath should be an array so throw an error if it isn't
	if(!_isArray(clipPath)) {
		throw {
			name : 'clip path element badly formed'
		};
	}
	for(var i=0; i < clipPath.length; i++) {
		//  handle child elements of clipPath. 
		//  I don't think we care about nested elements?
		//  better check the spec!
		//  some more defensive programming here.
		if(!_isObject(clipPath[i])) {
			throw {
				name : 'clip path children should all be objects'
			};
		}
		//  we are only interested in the first property within this object.
		var childPathElementName = Object.keys(clipPath[i])[0];
		switch(childPathElementName) {
		case 'path':
			this._handlePathElement(clipPath[i]);		
			break;
		case '':
			break;
		}
	}
};

/*
		arguments are a string representing an svg clippath, the initial width of the box containing 
the path and the initial height. The convert function should take all the coords specified within the path and make them proportionate to the width or height and then return the new clippath as a string.

Should throw an error if the input is badly formed. the user is responsible for passing a correctly formed clippath.

*/
exports.convert = function (xml, initialWidth, initialHeight) {
	var self = this;
	parseString(xml, function (err, result) {
     console.log('foo',util.inspect(result, false, null));
		forEachClipPath(result, self.convertClipPath.bind(self));
		var builder = new xml2js.Builder();
		var convertedXml = builder.buildObject(result);
		console.log(convertedXml);
	});	
}
//  pinched from underscore!
function _isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}



function _isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function forEachClipPath(xml, callback) {
	// find all clip paths within xml and calll call back on all of them	
	if(_isArray(xml)) {
		// handle as array
		for(var i = 0; i < xml.length; i++) {
			forEachClipPath(xml[i], callback);
		}
	} else if(_isObject(xml)) {
		for(var prop in xml) {
			if(xml.hasOwnProperty(prop)) {
				var propertyVal = xml[prop];
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
exports._forEachClipPath = forEachClipPath; // export so we can test
exports.convertFile = function (svgFile) {
	//  should take an svg file and convert all clip paths in it
}
