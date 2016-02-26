#! /usr/bin/env node

var malebranche = require('../src/malebranche.js');

var srcFile = process.argv[2];
var referenceLength = process.argv[3];

if(srcFile && referenceLength) {
	malebranche.main(srcFile, referenceLength);
} else {
	throw {
		message : 'you must supply a source file and a reference length'
	};
}

/*
todo
	allow user to specify destination file, allow file to reside in folder where Malebranche is being run
*/
