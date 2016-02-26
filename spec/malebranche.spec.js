describe('read-file tests', function () {
	var malebranche = require('../src/malebranche.js');
	describe('_forEachClipPath()', function () {
		var callback;
		var srcSVGObj =
			{ svg:
				 { '$': { height: '0', width: '0' },
					 defs:
						[{ clipPath:
							[ { '$': { id: 'foo' },
								path:
									[ { '$':
										{ fill: '#FFFFFF',
											stroke: '#000000',
											'stroke-width': '1.5794',
											'stroke-miterlimit': '10',
											d: 'M100 0L200 200L 0 200Z' }}]}]},
						{ clipPath:
							[{ '$': { id: 'bar' },
								path:
									[{ '$':
										{ fill: '#FFFFFF',
											stroke: '#000000',
											'stroke-width': '1.5794',
											'stroke-miterlimit': '10',
											d: 'M100 0L200 200L 0 200Z' }}]}]}
							]}};

		beforeEach(function () {
			callback = jasmine.createSpy();
			malebranche._forEachClipPath(srcSVGObj, callback);
		});
		it('should call callback for each clip path', function () {
			expect(callback.calls.length).toEqual(2);
			expect(callback.calls[0].args[0][0]['$'].id).toEqual('foo');
			expect(callback.calls[1].args[0][0]['$'].id).toEqual('bar');
		});
	});
});