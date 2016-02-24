describe('parsing spec', function () {

	var utils = require('../malebranche-utils.js');
	var arrayFromPoint = utils.arrayFromPoints;
	var pathArray;

	describe('when points are space separated', function () {
		beforeEach(function () {
			var pathString = '200 345 822 45 12 45 67';
	    pathArray = arrayFromPoint(pathString);
		});
		it('should return array of points', function () {
	    expect(pathArray).toEqual([200, 345, 822, 45, 12, 45, 67]);
		});
	});

	describe('when points are comma separated', function () {
		beforeEach(function () {
			var pathString = '200, 345, 822, 45, 12, 45, 67';
			pathArray = arrayFromPoint(pathString);
		});
		it('should return array of points', function () {
			expect(pathArray).toEqual([200, 345, 822, 45, 12, 45, 67]);
		});
	});

	describe('when points are comma and space separated', function () {
		beforeEach(function () {
			var pathString = '200 345, 822 45, 12 45';
			pathArray = arrayFromPoint(pathString);
		});
		it('should return array of points', function () {
			expect(pathArray).toEqual([200, 345, 822, 45, 12, 45]);
		});
	});

	describe('when points are comma and space separated in a slighly crazy way', function () {
		beforeEach(function () {
			var pathString = '200,345, 822 45,12 45';
			pathArray = arrayFromPoint(pathString);
		});
		it('should return array of points', function () {
			expect(pathArray).toEqual([200, 345, 822, 45, 12, 45]);
		});
	});
});