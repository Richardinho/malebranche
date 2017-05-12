#! /usr/bin/env node

let malebranche = require('../src/malebranche.js');
let help = require('./command-line-usage.js');

const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name : 'name',    type : String, alias: 'n' },
  { name : 'src',     type : String, multiple: false, defaultOption: true },
  { name : 'width',   type : Number, alias : 'w' },
  { name : 'height',  type : Number, alias : 'h' },
  { name : 'xmin',    type : Number },
  { name : 'ymin',    type : Number },
  { name : 'help' }
]

const options = commandLineArgs(optionDefinitions)

const srcFile = options.src;
const name = options.name;
const hReferenceLength = options.width;
const vReferenceLength = options.height;
const xMin = parseInt(options.xmin, 10) || 0;
const yMin = parseInt(options.ymin, 10) || 0;

if (srcFile && name && hReferenceLength & vReferenceLength) {
	malebranche.main(srcFile, name, hReferenceLength, vReferenceLength, xMin, yMin);
} else {
	console.log(help);
}


