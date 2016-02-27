# Malebranche - node process for converting clip path coordinates from absolute to relative

A tool for converting svg clip path coordinates from absolute units to fractional units in a range between 0 and 1.
The purpose of this is to be able to use clip paths with clip path units set relative to the referencing element rather
than to user space (the browser viewport) which isn't very useful.

The clip path css property offers huge potential for creating clip regions but can be difficult to work with
due to some of the details of the SVG grammar. The issues involved are discussed in this article:
* [Discussion on clip path](http://blog.richardhunter.co.uk/index.php/7)

---

## Install

```sh
$ npm install --save malebranche
```
##  Usage

```sh

var malebranche = require('malebranche');

malebranche.main('my-file.svg', 800);

```
A file called 'destination.svg' should appear in the folder that this file was run.

Malebranche depends on [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/).


## License

Copyright (c) 2016 Richard Hunter

Licensed under the ISC License
