# Malebranche

A node utility for converting clip path coordinates from absolute to fractional

### Introduction
The CSS clip-path property permits svg clip paths to be used as clip paths for html elements,
effectively allowing custom shapes to be applied to elements. 
This enables a lot of interesting effects to be achieved.

Here is a simple example. A CSS rule set defines a list of declarations which includes a `clip-path` property that references  an svg clip path element using the `url()` function.

```
    .foo {
        width : 200px;
        height : 200px;
        background : pink;
        clip-path : url(#clock);
    }
```
The SVG clip path definition follows. Note the `id` property of the `clipPath` element which is referenced by the `clip-path` property.

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

![example 1](https://richardinho.github.io/malebranche-tests/test2/images/example-1.png)
[live demo](https://richardinho.github.io/malebranche-tests/test2/)

The image shows, below, a pink square with a clip path applied. Above it, is a pink square of the same dimensions without a clip path. The applied clip path has coordinates that are equal to the coordinates of the original SVG clip path, translated by x and y values of the html element to which the path is applied. In other words, the dimensions of the element have effect at all on the coordinates of the clip path.

Clearly, we might wish, in some cases, for the clip path to stretch and scale to fit the dimensions of our html element. This, however, is possible.

We need to add a `clipPathUnits` attribute to the original `clip-path` element and set its value to 'objectBoundingBox'. Next, we need to change the coordinates of the clip path to fractional values. That is to say, values between 0 and 1. For example, if the html element is 100px wide, then an x coordinate of value 0.5 will be located 50px from the left edge of the element.

Malebranche is a Node based utility we use for converting from decimal to fractional coordinates. It can be used programatically or from the command line. You supply it with values which the x and y coordinates are calculated relative to. Details on usage are provided below.

The end result will be a path with the translated coordinates.

```
    <path d="M0.5 0c-0.27615625 0 -0.5 0.22384375 -0.5 0.5s 0.22384375 0.5 0.5 0.5 0.5 -0.22384375 0.5 -0.5 -0.22384375 -0.5 -0.5 -0.5ZM0.6433125 0.7316875l-0.2058125 -0.2058125v-0.275875h0.125v0.224125l0.1691875 0.1691875 -0.08840625 0.08840625Z"/>

```

After copying this path into back into the original file, replacing the old path, we end up with this.


```
    <svg height="0" width="0">
        <defs>
            <clipPath id="clock" clipPathUnits="objectBoundingBox">
                <path d="M0.5 0c-0.27615625 0 -0.5 0.22384375 -0.5 0.5s 0.22384375 0.5 0.5 0.5 0.5 -0.22384375 0.5 -0.5 -0.22384375 -0.5 -0.5 -0.5ZM0.6433125 0.7316875l-0.2058125 -0.2058125v-0.275875h0.125v0.224125l0.1691875 0.1691875 -0.08840625 0.08840625Z"/>
            </clipPath>
        </defs>
    </svg>

```
And this is the resulting effect. As you can see, the clip path now scales and stretches to fit the html element.

![example 2](https://richardinho.github.io/malebranche-tests/test2/images/example-2.png)
[live demo](https://richardinho.github.io/malebranche-tests/test2/index2.html)
---

## Install

```sh
$ npm install --save malebranche
```
##  Usage

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
