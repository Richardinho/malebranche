
var malebrancheUtils = require('./malebranche-utils.js'),
    malebrancheIO = require('./malebranche-io.js'),
    parsePath  = require('svg-path-parser');
    pathBuilder = require('./svg-path-builder.js');

var _isArray = malebrancheUtils.isArray;
var _isObject = malebrancheUtils.isObject;
var parseStringIntoJs = malebrancheUtils.parseStringIntoJs;
var serializeJSIntoString = malebrancheUtils.serializeJSIntoString;
var arrayFromPoints = malebrancheUtils.arrayFromPoints;
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

// what if size is greater than 1?
function handleCircle(reflength, circle) {
	var circleData = circle['$'];
	circleData.r = parseInt(circleData.r, 10) / reflength;
	circleData.cy = parseInt(circleData.cy, 10) / reflength;
	circleData.cx = parseInt(circleData.cx, 10) / reflength;
};

function handleCommand (reflength, command) {
	switch(command.code){
	case 'M':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		break;
	case 'm':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		break;
	case 'L':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		break;
	case 'l':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		break;
	case 'V':
		command.y = command.y / reflength;
		break;
	case 'v':
		command.y = command.y / reflength;
		break;
	case 'H':
		command.x = command.x / reflength;
		break;
	case 'h':
		command.x = command.x / reflength;
		break;
	case 'C':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.x1 = command.x1 / reflength;
 		command.y1 = command.y1 / reflength;
		command.x2 = command.x2 / reflength;
 		command.y2 = command.y2 / reflength;
		break;
	case 'c':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.x1 = command.x1 / reflength;
 		command.y1 = command.y1 / reflength;
		command.x2 = command.x2 / reflength;
 		command.y2 = command.y2 / reflength;
		break;
	case 'S':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.x2 = command.x2 / reflength;
 		command.y2 = command.y2 / reflength;
		break;
	case 's':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.x2 = command.x2 / reflength;
 		command.y2 = command.y2 / reflength;
		break;
	case 'Q':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.x1 = command.x1 / reflength;
		command.y1 = command.y1 / reflength;
		break;
	case 'q':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.x1 = command.x1 / reflength;
		command.y1 = command.y1 / reflength;
		break;
	case 'T':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		break;
	case 't':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		break;
	case 'A':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.rx = command.rx / reflength;
		command.ry = command.ry / reflength;
		// do I need to do x-axis-rotation?
		break;
	case 'a':
		command.x = command.x / reflength;
		command.y = command.y / reflength;
		command.rx = command.rx / reflength;
		command.ry = command.ry / reflength;
		// do I need to do x-axis-rotation?
		break;
	default :
		// do something else
	}
}


function handlePath(reflength, path) {
	var pathString = path['$']['d'];
	var pathCommands = parsePath(pathString);
	pathCommands.forEach(handleCommand.bind(null, reflength));
	path['$']['d'] = pathBuilder.build(pathCommands);
}

function handleRectangle(reflength, rectangle) {
	var rectData = rectangle['$'];
	rectData.x = parseInt(rectData.x , 10) / reflength;
	rectData.y = parseInt(rectData.y , 10) / reflength;
	rectData.width = parseInt(rectData.width , 10) / reflength;
	rectData.height = parseInt(rectData.height , 10) / reflength;
}

function handlePolygon(reflength, polygon) {
	var pointsArray = arrayFromPoints(polygon['$']['points']);
	var transformedPointsArray = pointsArray.map(function (point) {
		return point / reflength;
	});
	polygon['$']['points'] = transformedPointsArray.join(' ');
}

function handleEllipse(reflength, ellipse) {
	var ellipseData = ellipse['$'];
	ellipseData.cx = parseInt(ellipseData.cx, 10) / reflength;
	ellipseData.cy = parseInt(ellipseData.cy, 10) / reflength;
	ellipseData.rx = parseInt(ellipseData.rx, 10) / reflength;
	ellipseData.ry = parseInt(ellipseData.ry, 10) / reflength;
}

//  this will change the coords of the clip path from absolute to fractional
function changeClipPathCoords(reflength, clipPath) {
	var circles = clipPath[0]['circle'];
	var paths = clipPath[0]['path'];
	var rectangles = clipPath[0]['rect'];
	var ellipses = clipPath[0]['ellipse'];
	var polygons = clipPath[0]['polygon'];

	if(circles) circles.forEach(handleCircle.bind(null, reflength));
	if(paths) paths.forEach(handlePath.bind(null, reflength));
	if(rectangles) rectangles.forEach(handleRectangle.bind(null, reflength));
	if(polygons) polygons.forEach(handlePolygon.bind(null, reflength));
	if(ellipses) ellipses.forEach(handleEllipse.bind(null, reflength));
}

function convertCoords(reflength, result) {
	forEachClipPath(result, changeClipPathCoords.bind(null, reflength));
	return result;
}

function errorHandler(error) {
	console.log('error', error);
}

exports.main = function(srcFile, referenceLength) {

	readFile(srcFile)
		.then(parseStringIntoJs)
		.then(convertCoords.bind(null, referenceLength))
		.then(serializeJSIntoString)
		.then(writeFile)
		.catch(errorHandler);

};

//  export for testing
exports._forEachClipPath = forEachClipPath;



