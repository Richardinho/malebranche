#! /usr/bin/env node

let malebranche = require('../src/malebranche.js');
let help = require('./command-line-usage.js');

const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name : 'name',       type : String, alias: 'n' },
  { name : 'src',        type : String, multiple: false, defaultOption: true },
  { name : 'decPlaces',  type : Number, alias: 'd' },
  { name : 'help' }
];

const options = commandLineArgs(optionDefinitions)

const srcFile = options.src;
const name = options.name;
const decimalPlaces = options.decPlaces;

if (srcFile && name) {
	malebranche.main(srcFile, name, decimalPlaces);
} else {
	console.log(help);
}


