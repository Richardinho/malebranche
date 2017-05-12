
var malebrancheUtils = require('./malebranche-utils.js'),
    malebrancheIO = require('./malebranche-io.js'),
    parsePath  = require('svg-path-parser'),
    pathBuilder = require('./svg-path-builder.js'),
    pointsParser = require('./points-parser.js');

var _isArray = malebrancheUtils.isArray;
var _isObject = malebrancheUtils.isObject;
var parseStringIntoJs = malebrancheUtils.parseStringIntoJs;
var serializeJSIntoString = malebrancheUtils.serializeJSIntoString;
var readFile = malebrancheIO.readFile;
var writeFile = malebrancheIO.writeFile;
var arrayFromPoints = pointsParser.arrayFromPoints;

function offsetX(offset, x) {
	return x - offset;
}

function offsetY(offset, y) {
	return y - offset;
}

/*
	A ‘clipPath’ element can contain ‘path’ elements, ‘text’ elements, basic shapes (such as ‘circle’) or
	a ‘use’ element. If a ‘use’ element is a child of a ‘clipPath’ element, it must directly reference ‘path’,
	‘text’ or basic shape elements. Indirect references are an error (see Error processing).
*/
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



//  Add support for text
//  add support for signed numbers and exponentials
function handleCommand (hRefLength, vRefLength, x, y, command) {
	switch(command.code){
	case 'M':
		command.x = offsetX(x, command.x) / hRefLength;
		command.y = offsetY(y, command.y) / vRefLength;
		break;
	case 'm':
		command.x = (command.x) / hRefLength;
		command.y = (command.y) / vRefLength;
		break;
	case 'L':
		command.x = offsetX(x, command.x) / hRefLength;
		command.y = offsetY(y, command.y) / vRefLength;
		break;
	case 'l':
		command.x = (command.x) / hRefLength;
		command.y = (command.y) / vRefLength;
		break;
	case 'V':
		command.y = offsetY(y, command.y) / vRefLength;
		break;
	case 'v':
		command.y = (command.y) / vRefLength;
		break;
	case 'H':
		command.x = offsetX(x, command.x) / hRefLength;
		break;
	case 'h':
		command.x = (command.x) / hRefLength;
		break;
	case 'C':
		command.x =  offsetX(x, command.x) / hRefLength;
		command.y =  offsetY(y, command.y) / vRefLength;
		command.x1 = offsetX(x, command.x1) / hRefLength;
 		command.y1 = offsetY(y, command.y1) / vRefLength;
		command.x2 = offsetX(x, command.x2) / hRefLength;
 		command.y2 = offsetY(y, command.y2) / vRefLength;
		break;
	case 'c':
		command.x =  (command.x ) / hRefLength;
		command.y =  (command.y ) / vRefLength;
		command.x1 = (command.x1)  / hRefLength;
 		command.y1 = (command.y1)  / vRefLength;
		command.x2 = (command.x2)  / hRefLength;
 		command.y2 = (command.y2)  / vRefLength;
		break;
	case 'S':
		command.x =  offsetX(x, command.x ) / hRefLength;
		command.y =  offsetY(y, command.y ) / vRefLength;
		command.x2 = offsetX(x, command.x2)  / hRefLength;
 		command.y2 = offsetY(y, command.y2)  / vRefLength;
		break;
	case 's':
		command.x =  (command.x ) / hRefLength;
		command.y =  (command.y ) / vRefLength;
		command.x2 = (command.x2)  / hRefLength;
 		command.y2 = (command.y2)  / vRefLength;
		break;
	case 'Q':
		command.x =  offsetX(x, command.x  ) / hRefLength;
		command.y =  offsetY(y, command.y  ) / vRefLength;
		command.x1 = offsetX(x, command.x1 )  / hRefLength;
		command.y1 = offsetY(y, command.y1 )  / vRefLength;
		break;
	case 'q':
		command.x =  (command.x  ) / hRefLength;
		command.y =  (command.y  ) / vRefLength;
		command.x1 = (command.x1 )  / hRefLength;
		command.y1 = (command.y1 )  / vRefLength;
		break;
	case 'T':
		command.x = offsetX(x, command.x ) / hRefLength;
		command.y = offsetY(y, command.y ) / vRefLength;
		break;
	case 't':
		command.x = (command.x ) / hRefLength;
		command.y = (command.y ) / vRefLength;
		break;
	case 'A':
		command.x =  offsetX(x, command.x  ) / hRefLength;
		command.y =  offsetY(y, command.y  ) / vRefLength;
		command.rx = offsetX(x, command.rx ) / hRefLength;
		command.ry = offsetY(y, command.ry ) / vRefLength;
		break;
	case 'a':
		command.x =  (command.x ) / hRefLength;
		command.y =  (command.y ) / vRefLength;
		command.rx = (command.rx) / hRefLength;
		command.ry = (command.ry) / vRefLength;
		break;
	default :
		// do something else
	}
}

function handlePath(hRefLength, vRefLength, x, y, path) {
	var pathString = path['$']['d'];
	var pathCommands = parsePath(pathString);
	pathCommands.forEach(handleCommand.bind(null, hRefLength, vRefLength, x, y));
	path['$']['d'] = pathBuilder.build(pathCommands);
}

// what if size is greater than 1?
function handleCircle(hRefLength, vRefLength, x, y, circle) {
	var circleData = circle['$'];
	circleData.r = parseInt(circleData.r, 10) / hRefLength;
	circleData.cy = offsetY(y, parseInt(circleData.cy, 10)) / vRefLength;
	circleData.cx = offsetX(x, parseInt(circleData.cx, 10)) / hRefLength;
};

function handleRectangle(hRefLength, vRefLength, x, y, rectangle) {
	var rectData = rectangle['$'];
	rectData.x = offsetX(x, parseInt(rectData.x , 10)) / hRefLength;
	rectData.y = offsetY(y, parseInt(rectData.y , 10)) / vRefLength;
	rectData.width = parseInt(rectData.width , 10) / hRefLength;
	rectData.height = parseInt(rectData.height , 10) / vRefLength;
}

function handlePolygon(hRefLength, vRefLength, x, y, polygon) {
	var pointsArray = arrayFromPoints(polygon['$']['points']);
	var bool = false
	var transformedPointsArray = pointsArray.map(function (point) {
		return (bool ^= true) ? offsetX(x, point) / hRefLength : offsetY(y, point) / vRefLength;
	});
	polygon['$']['points'] = transformedPointsArray.join(' ');
}

function handleEllipse(hRefLength, vRefLength, x, y, ellipse) {
	var ellipseData = ellipse['$'];
	ellipseData.cx = offsetX(x, parseInt(ellipseData.cx, 10)) / hRefLength;
	ellipseData.cy = offsetY(y, parseInt(ellipseData.cy, 10)) / vRefLength;
	ellipseData.rx = offsetX(x, parseInt(ellipseData.rx, 10)) / hRefLength;
	ellipseData.ry = offsetY(y, parseInt(ellipseData.ry, 10)) / vRefLength;
}

function handleText(hRefLength, vRefLength, x, y, text) {
	var textData = text['$'];
	textData.x = offsetX(x, parseInt(textData.x, 10)) / hRefLength;
	textData.y = offsetY(y, parseInt(textData.y, 10)) / vRefLength;
	textData['font-size'] = parseInt(textData['font-size'], 10) / hRefLength;
}

//  this will change the coords of the clip path from absolute to fractional
function changeClipPathCoords(hRefLength, vRefLength, x, y, clipPath) {
	var circles = clipPath[0]['circle'];
	var paths = clipPath[0]['path'];
	var rectangles = clipPath[0]['rect'];
	var ellipses = clipPath[0]['ellipse'];
	var polygons = clipPath[0]['polygon'];
	var textArray = clipPath[0]['text'];
	//  todo: handle 'use' element which references other elements within the object.

	if(circles) circles.forEach(handleCircle.bind(null,          hRefLength, vRefLength, x, y));
	if(paths) paths.forEach(handlePath.bind(null,                hRefLength, vRefLength, x, y));
	if(rectangles) rectangles.forEach(handleRectangle.bind(null, hRefLength, vRefLength, x, y));
	if(polygons) polygons.forEach(handlePolygon.bind(null,       hRefLength, vRefLength, x, y));
	if(ellipses) ellipses.forEach(handleEllipse.bind(null,       hRefLength, vRefLength, x, y));
	if(textArray) textArray.forEach(handleText.bind(null,        hRefLength, vRefLength, x, y));
}

function convertCoords(hRefLength, vRefLength, x, y, result) {
	forEachClipPath(result, changeClipPathCoords.bind(null, hRefLength, vRefLength, x, y));
	return result;
}

function errorHandler(error) {
	console.log('error', error);
}

exports.main = function(srcFile, name, hRefLength, vRefLength, x, y) {
	readFile(srcFile)
		.then(parseStringIntoJs)
		.then(convertCoords.bind(null, hRefLength, vRefLength, x, y))
		.then(serializeJSIntoString)
		.then(writeFile.bind(null, name))
		.catch(errorHandler);

};


//  export for testing
exports._forEachClipPath = forEachClipPath;
exports.handleCircle = handleCircle;
exports.handleCommand = handleCommand;
exports.handlePolygon = handlePolygon;
exports.handleEllipse = handleEllipse;
exports.handleText = handleText;
exports.convertCoords = convertCoords;



