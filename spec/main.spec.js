describe('Malebranche tests', function () {
	var malebranche = require('../index.js');
	describe('malebranche.name', function () {
		it('should return module name', function () {
			expect(malebranche.name).toBe('malebranche');
		});
	});
});
