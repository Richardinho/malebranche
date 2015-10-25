var parse  = require('svg-path-parser');

function test() {

	var result = parse('M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0');
	console.log(result);

}
test();
//  convert array of commands back to string
//  surprised this isn't in svg path parser?
exports.toPath = function(commands) {
	//  commands is an array of commands produced by svg pathparser.
	return '';

};
//  http://www.w3.org/TR/SVG11/masking.html#EstablishingANewClippingPath
exports.allowedElementTypes = [
	'path', 'text', 'use', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'
];

exports.isLegalElement = function(element) {
	return this.allowedElementTypes.indexOf(element) != -1;
}

exports.printModuleName = function () {
	console.log('this is Malebranche');
};
exports.name = 'malebranche';

exports.convert = function (fragment, initialWidth, initialHeight) {

	/*
		arguments are a string representing an svg clippath, the initial width of the box containing 
the path and the initial height. The convert function should take all the coords specified within the path and make them proportionate to the width or height and then return the new clippath as a string.

Should throw an error if the input is badly formed. the user is responsible for passing a correctly formed clippath.

	*/

}

exports.convertFile = function (svgFile) {
	//  should take an svg file and convert all clip paths in it
}
