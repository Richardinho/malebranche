function arrayFromPoints(pointsString) {
	return pointsString.split(/[ ,]+/).map(function (el) {
		return parseInt(el, 10);
	});
}

exports.arrayFromPoints = arrayFromPoints;