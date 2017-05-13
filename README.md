# Malebranche

A node utility for converting clip path coordinates from decimal to fractional values.

### Introduction
The CSS clip-path property permits svg clip paths to be used as clip paths for html elements, effectively allowing elements to be formed as custom shapes.

Here is a simple example.

```
    <div class="foo"></div>

    <svg height="0" width="0">
        <defs>
            <clipPath id="clock">
                <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414-2.829 2.829z"></path>
            </clipPath>
        </defs>
    </svg>
```
Now the CSS. 
The rule set includes a `clip-path` declaration which references the SVG clip path.

```
    .foo {
        width : 200px;
        height : 200px;
        background : pink;
        clip-path : url(#clock);
    }
```
This results in the following.

![example 1](https://richardinho.github.io/malebranche-tests/test2/images/example-1.png)
[live demo](https://richardinho.github.io/malebranche-tests/test2/)

You can see in the first row a series of pink squares of different dimensions. 
The second row repeats the same sequence of elements but with a clip path applied. 
Observe that the clip path remains the same size regardless of the element to which it is applied.

But what if we want the clip path to be adustable, scaling and stretching, to fit the HTML element?

In fact, this is possible: first we add a `clipPathUnits` attribute to the original `clip-path` element and set its value to 'objectBoundingBox'.
Next, we need to change the coordinates of the clip path to fractional values; that is to say, values between 0 and 1. 
For example, if the html element is 100px wide, then an x coordinate of value 0.5 will be located 50px from the left edge of the element.

The question is: how do we do this?

Here is the answer. 
Malebranche is a Node based utility which converts coordinates of a clip path from decimal to fractional values. 
It can be used from the command line or programmatically in a Node script. 
Details on usage are provided below. 
You supply it with a source file and width and height values to calculate the coordinates relative to and it  generates a file which contains the converted path.

We can now create clip paths that scale and stretch correctly.

![example 2](https://richardinho.github.io/malebranche-tests/test2/images/example-2.png)
[live demo](https://richardinho.github.io/malebranche-tests/test2/index2.html)

------------------------------------------------------------------------------------------------------------------------

##  Usage

### Install

```sh
$ npm install --save malebranche
```
### Programmatic

```
var malebranche = require('malebranche');

malebranche.main('my-file.svg', 800);
```
A file called 'destination.svg' should appear in the folder that this file was run.

###  Command line
```
malebranche --width 800 --height 600 --name generated.svg --src ./source.svg
```
See help files for full list of options

## License

Copyright (c) 2016 Richard Hunter

Licensed under the ISC License
