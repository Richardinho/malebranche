describe('read-file tests', function () {
	var malebranche = require('../src/malebranche.js');

	describe('handleCircle()', function () {
		var circle,
		    horizontalRefLength,
		    verticalRefLength,
		    cx,
		    cy,
		    r;

		beforeEach(function () {

			cx = 12;
			cy = 34;
			r = 45;

			circle = {
				'$' : {
					r : r,
					cx : cx,
					cy : cy
				}
			};
			horizontalRefLength = 25;
			verticalRefLength = 34;
			x = 34;
			y = 67;
			malebranche.handleCircle(horizontalRefLength, verticalRefLength, x, y, circle);

		});

		it('should convert absolute coords to relative coords', function () {

			expect(circle['$'].cx).toBe((cx - x) / horizontalRefLength);
			expect(circle['$'].cy).toBe((cy - y) / verticalRefLength);
			expect(circle['$'].r).toBe(r / horizontalRefLength);
		});
	});

	describe('handleCommand()', function () {

		var hRefLength,
		    vRefLength,
		    x, y, xmin = -23, ymin = 78,
		    command;

		describe('M', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'M',
					x : x,
					y : y
				};

				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});
		describe('m', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'm',
					x : x,
					y : y
				};

				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
			});
		});
		describe('L', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'L',
					x : x,
					y : y
				};

				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});
		describe('l', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'l',
					x : x,
					y : y
				};

				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
			});
		});
		describe('V', function () {

			beforeEach(function () {
				vRefLength = 23;
				y = 12;
				command = {
					code : 'V',
					y : y
				};

				malebranche.handleCommand(null, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});
		describe('v', function () {

			beforeEach(function () {
				vRefLength = 23;
				y = 12;
				command = {
					code : 'v',
					y : y
				};

				malebranche.handleCommand(null, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.y).toBe(y / vRefLength);
			});
		});
		describe('H', function () {

			beforeEach(function () {
				hRefLength = 43;
				x = 23;
				command = {
					code : 'H',
					x : x
				};

				malebranche.handleCommand(hRefLength, null, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
			});
		});
		describe('h', function () {

			beforeEach(function () {
				hRefLength = 43;
				x = 23;
				command = {
					code : 'h',
					x : x
				};

				malebranche.handleCommand(hRefLength, null, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
			});
		});
		describe('C', function () {
			var x,
				y,
				x1,
				y1,
				x2,
				y2;

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				x1 = 45;
				y1 = 67;
				x2 = 87;
				y2 = 56;

				command = {
					code : 'C',
					x : x,
					y : y,
					x1 : x1,
					y1 : y1,
					x2 : x2,
					y2 : y2
				};

				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.x1).toBe((x1 - xmin) / hRefLength);
				expect(command.y1).toBe((y1 - ymin) / vRefLength);
				expect(command.x2).toBe((x2 - xmin) / hRefLength);
				expect(command.y2).toBe((y2 - ymin) / vRefLength);
			});
		});
		describe('c', function () {
			var x,
				y,
				x1,
				y1,
				x2,
				y2;

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				x1 = 45;
				y1 = 67;
				x2 = 87;
				y2 = 56;

				command = {
					code : 'c',
					x : x,
					y : y,
					x1 : x1,
					y1 : y1,
					x2 : x2,
					y2 : y2
				};

				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.x1).toBe(x1 / hRefLength);
				expect(command.y1).toBe(y1 / vRefLength);
				expect(command.x2).toBe(x2 / hRefLength);
				expect(command.y2).toBe(y2 / vRefLength);
			});
		});
		describe('S', function () {
			var x,
				y,
				x2,
				y2;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x2 = 87;
				y2 = 56;
				command = {
					code : 'S',
					x : x,
					y : y,
					x2 : x2,
					y2 : y2
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.x2).toBe((x2 - xmin) / hRefLength);
				expect(command.y2).toBe((y2 - ymin) / vRefLength);
			});
		});
		describe('s', function () {
			var x,
				y,
				x2,
				y2;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x2 = 87;
				y2 = 56;
				command = {
					code : 's',
					x : x,
					y : y,
					x2 : x2,
					y2 : y2
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.x2).toBe(x2 / hRefLength);
				expect(command.y2).toBe(y2 / vRefLength);
			});
		});
		describe('Q', function () {
			var x,
				y,
				x1,
				y1;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x1 = 87;
				y1 = 56;
				command = {
					code : 'Q',
					x : x,
					y : y,
					x1 : x1,
					y1 : y1
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.x1).toBe((x1 - xmin) / hRefLength);
				expect(command.y1).toBe((y1 - ymin) / vRefLength);
			});
		});
		describe('q', function () {
			var x,
				y,
				x1,
				y1;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x1 = 87;
				y1 = 56;
				command = {
					code : 'q',
					x : x,
					y : y,
					x1 : x1,
					y1 : y1
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.x1).toBe(x1 / hRefLength);
				expect(command.y1).toBe(y1 / vRefLength);
			});
		});
		describe('T', function () {
			var x,
				y;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				command = {
					code : 'T',
					x : x,
					y : y
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});
		describe('t', function () {
			var x,
				y;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				command = {
					code : 't',
					x : x,
					y : y
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
			});
		});
		describe('A', function () {
			var x,
				y,
				rx,
				ry;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				rx = 34;
				ry = 32;
				command = {
					code : 'A',
					x : x,
					y : y,
					rx : rx,
					ry : ry
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.rx).toBe((rx - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.ry).toBe((ry - ymin) / vRefLength);
			});
		});
		describe('a', function () {
			var x,
				y,
				rx,
				ry;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				rx = 34;
				ry = 32;
				command = {
					code : 'a',
					x : x,
					y : y,
					rx : rx,
					ry : ry
				};
				malebranche.handleCommand(hRefLength, vRefLength, xmin, ymin, command);
			});
			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.rx).toBe(rx / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.ry).toBe(ry / vRefLength);
			});
		});
	});

	describe('handlePolygon()', function () {

		var hRefLength,
		    vRefLength,
		    polygon;

		beforeEach(function () {

			hRefLength = 340;
			vRefLength = 230;
			x = 34;
			y = 67;

			polygon = {
				'$' : {
					points : '85, 92 340, 184'
				}
			};
			malebranche.handlePolygon(hRefLength, vRefLength, x, y, polygon);

		});
		it('should convert absolute coords to relative coords', function () {
			let a = (85 - x) / hRefLength;
			let b = (92 - y) / vRefLength;
			let c = (340 - x) / hRefLength;
			let d = (184 - y) / vRefLength;
			expect(polygon['$'].points).toEqual(`${a} ${b} ${c} ${d}`);
		});
	});

	describe('handleEllipse()', function () {
		var hRefLength,
		    vRefLength,
		    ellipse,
		    cx, cy, rx, ry;

		beforeEach(function () {

			hRefLength = 340;
			vRefLength = 230;
			x = 34;
			y = 23;

			cx = 34;
			cy = 56;
			rx = 23;
			ry = 78;

			ellipse = {
				'$' : {
					cx: cx,
					cy: cy,
					rx: rx,
					ry: ry
				}
			};
			malebranche.handleEllipse(hRefLength, vRefLength, x, y, ellipse);

		});
		it('should convert absolute coords to relative coords', function () {

			expect(ellipse['$'].cx).toEqual((cx - x) / hRefLength);
			expect(ellipse['$'].cy).toEqual((cy - y) / vRefLength);
			expect(ellipse['$'].rx).toEqual((rx - x) / hRefLength);
			expect(ellipse['$'].ry).toEqual((ry - y) / vRefLength);
		});
	});

	describe('handleText()', function () {
		var hRefLength,
			vRefLength,
			x,
			y,
			xmin,
			ymin,
			fontSize,
			text;

		beforeEach(function () {
			hRefLength = 340;
			vRefLength = 230;
			xmin = 23;
			ymin = 8;
			x = 34;
			y = 24;
			fontSize : 23;

			text = { '$' : {
				x : x,
				y : y,
				'font-size' : fontSize
			}};

			malebranche.handleText(hRefLength, vRefLength, xmin, ymin, text);
		});
		it('should convert absolute coords to relative coords', function () {

			expect(text['$'].x).toBe((x - xmin) / hRefLength);
			expect(text['$'].y).toBe((y - ymin) / vRefLength);

		});
	});

	describe('convertCoords', function () {






	});

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