

describe('Malebranche tests', function () {

	var malebranche = require('../index.js');
	describe('name', function () {
		it('should return module name', function () {
			expect(malebranche.name).toBe('malebranche');
		});
	});
	describe('isLegalElement()', function () {
		it('should allow legal children', function () {
			expect(malebranche.isLegalElement('path')).toBe(true);
			expect(malebranche.isLegalElement('text')).toBe(true);
			expect(malebranche.isLegalElement('use')).toBe(true);
			expect(malebranche.isLegalElement('rect')).toBe(true);
			expect(malebranche.isLegalElement('circle')).toBe(true);
			expect(malebranche.isLegalElement('ellipse')).toBe(true);
			expect(malebranche.isLegalElement('line')).toBe(true);
			expect(malebranche.isLegalElement('polyline')).toBe(true);
			expect(malebranche.isLegalElement('polygon')).toBe(true);
		});
		it('should disallow illegal children', function () {
			expect(malebranche.isLegalElement('div')).toBe(false);
		});
	});
});
