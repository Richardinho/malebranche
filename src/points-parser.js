function arrayFromPoints(pointsString) {
	return pointsString.trim().split(/[ ,]+/).map(function (el) {
		return parseInt(el, 10);
	});
}

exports.arrayFromPoints = arrayFromPoints;