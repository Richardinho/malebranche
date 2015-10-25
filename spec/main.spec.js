describe('Malebranche tests', function () {
	var malebranche = require('../index.js');
	describe('handlePath', function () {
		//  todo: this should return a converted path of course
		it('should return path', function () {
			var path = 'M3,7 L5,-6 L1,7 L100,-0.4 m-10,10 l10,0';
			expect(malebranche.handlePath(path)).toBe(path);
		});
	});
	describe('name', function () {
		it('should return module name', function () {
			expect(malebranche.name).toBe('malebranche');
		});
	});
	xdescribe('serialize()', function () {
		var pathArray= [ 
			{ code: 'M', command: 'moveto', x: 3, y: 7 },
  		{ code: 'L', command: 'lineto', x: 5, y: -6 },
  		{ code: 'L', command: 'lineto', x: 1, y: 7 },
  		{ code: 'L', command: 'lineto', x: 100, y: -0.4 },
  		{ code: 'm', command: 'moveto', relative: true, x: -10, y: 10 },
  		{ code: 'l', command: 'lineto', relative: true, x: 10, y: 0 } ];
		it('should return path', function () {
			expect(malebranche.serialize(pathArray)).toBe('M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0');
		});
	});
	describe('convert()', function () {

		var svg = "<svg><clipPath><path d='M3,7 L5,-6 L1,7 L100,-0.4 m-10,10 l10,0'/></clipPath></svg>";
		malebranche.convert(svg);
	});
	xdescribe('_forEachClipPath()', function () {
		var spy;
		var obj = {
			foo  : [
				{ clipPath : { name : 'alpha' } },
				{ bar : {
						blah : {
							moo : 'moo', clipPath : { name : 'beta' }
						}
					}
				}
			],
			clipPath : []
		};
		beforeEach(function () {
			spy = jasmine.createSpy();
		});
		it('should invoke callback for each clipPath element',function (){
			malebranche._forEachClipPath(obj, spy);
			expect(spy.calls.count()).toBe(3);
		});
	});
});
