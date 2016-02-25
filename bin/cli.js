#! /usr/bin/env node

var malebranche = require('../malebranche.js');

var srcFile = process.argv[2];

if(srcFile) {
	malebranche.main(srcFile);
} else {
	throw {
		message : 'you must supply a source file'
	};
}
