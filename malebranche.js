
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

var refsize = 960;

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
function handleCircle(refsize, circle) {
	var circleData = circle['$'];
	circleData.r = parseInt(circleData.r, 10) / refsize;
	circleData.cy = parseInt(circleData.cy, 10) / refsize;
	circleData.cx = parseInt(circleData.cx, 10) / refsize;
};

function handleCommand (refsize, command) {
	switch(command.code){
	case 'M':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		break;
	case 'm':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		break;
	case 'L':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		break;
	case 'l':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		break;
	case 'V':
		command.y = command.y / refsize;
		break;
	case 'v':
		command.y = command.y / refsize;
		break;
	case 'H':
		command.x = command.x / refsize;
		break;
	case 'h':
		command.x = command.x / refsize;
		break;
	case 'C':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.x1 = command.x1 / refsize;
 		command.y1 = command.y1 / refsize;
		command.x2 = command.x2 / refsize;
 		command.y2 = command.y2 / refsize;
		break;
	case 'c':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.x1 = command.x1 / refsize;
 		command.y1 = command.y1 / refsize;
		command.x2 = command.x2 / refsize;
 		command.y2 = command.y2 / refsize;
		break;
	case 'S':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.x2 = command.x2 / refsize;
 		command.y2 = command.y2 / refsize;
		break;
	case 's':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.x2 = command.x2 / refsize;
 		command.y2 = command.y2 / refsize;
		break;
	case 'Q':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.x1 = command.x1 / refsize;
		command.y1 = command.y1 / refsize;
		break;
	case 'q':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.x1 = command.x1 / refsize;
		command.y1 = command.y1 / refsize;
		break;
	case 'T':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		break;
	case 't':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		break;
	case 'A':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.rx = command.rx / refsize;
		command.ry = command.ry / refsize;
		// do I need to do x-axis-rotation?
		break;
	case 'a':
		command.x = command.x / refsize;
		command.y = command.y / refsize;
		command.rx = command.rx / refsize;
		command.ry = command.ry / refsize;
		// do I need to do x-axis-rotation?
		break;
	default :
		// do something else
	}
}


function handlePath(refsize, path) {
	var pathString = path['$']['d'];
	var pathCommands = parsePath(pathString);
	pathCommands.forEach(handleCommand.bind(null, refsize));
	path['$']['d'] = pathBuilder.build(pathCommands);
}

function handleRectangle(refsize, rectangle) {
	var rectData = rectangle['$'];
	rectData.x = parseInt(rectData.x , 10) / refsize;
	rectData.y = parseInt(rectData.y , 10) / refsize;
	rectData.width = parseInt(rectData.width , 10) / refsize;
	rectData.height = parseInt(rectData.height , 10) / refsize;
}

function handlePolygon(refsize, polygon) {
	var pointsArray = arrayFromPoints(polygon['$']['points']);
	var transformedPointsArray = pointsArray.map(function (point) {
		return point / refsize;
	});
	polygon['$']['points'] = transformedPointsArray.join(' ');
}

function handleEllipse(refsize, ellipse) {
	var ellipseData = ellipse['$'];
	ellipseData.cx = parseInt(ellipseData.cx, 10) / refsize;
	ellipseData.cy = parseInt(ellipseData.cy, 10) / refsize;
	ellipseData.rx = parseInt(ellipseData.rx, 10) / refsize;
	ellipseData.ry = parseInt(ellipseData.ry, 10) / refsize;
}

//  this will change the coords of the clip path from absolute to fractional
function changeClipPathCoords(clipPath) {
	var circles = clipPath[0]['circle'];
	var paths = clipPath[0]['path'];
	var rectangles = clipPath[0]['rect'];
	var ellipses = clipPath[0]['ellipse'];
	var polygons = clipPath[0]['polygon'];

	if(circles) circles.forEach(handleCircle.bind(null, refsize));
	if(paths) paths.forEach(handlePath.bind(null, refsize));
	if(rectangles) rectangles.forEach(handleRectangle.bind(null, refsize));
	if(polygons) polygons.forEach(handlePolygon.bind(null, refsize));
	if(ellipses) ellipses.forEach(handleEllipse.bind(null, refsize));
}

function convertCoords(result) {
	forEachClipPath(result, changeClipPathCoords);
	return result;
}

function errorHandler(error) {
	console.log('error', error);
}

exports.main = function(srcFile) {

	readFile(srcFile)
		.then(parseStringIntoJs)
		.then(convertCoords)
		.then(serializeJSIntoString)
		.then(writeFile)
		.catch(errorHandler);

};

//  export for testing
exports._forEachClipPath = forEachClipPath;



