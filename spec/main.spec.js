

describe('Malebranche tests', function () {

	var malebranche = require('../index.js');
	describe('name', function () {
		it('should return module name', function () {
			expect(malebranche.name).toBe('malebranche');
		});
	});
	describe('_isLegalElement()', function () {
		it('should allow legal children', function () {
			expect(malebranche._isLegalElement('path')).toBe(true);
			expect(malebranche._isLegalElement('text')).toBe(true);
			expect(malebranche._isLegalElement('use')).toBe(true);
			expect(malebranche._isLegalElement('rect')).toBe(true);
			expect(malebranche._isLegalElement('circle')).toBe(true);
			expect(malebranche._isLegalElement('ellipse')).toBe(true);
			expect(malebranche._isLegalElement('line')).toBe(true);
			expect(malebranche._isLegalElement('polyline')).toBe(true);
			expect(malebranche._isLegalElement('polygon')).toBe(true);
		});
		it('should disallow illegal children', function () {
			expect(malebranche._isLegalElement('div')).toBe(false);
		});
	});
});
