# Malebranche - node utility for converting clip path coordinates from absolute to fractional

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

See the demo [here](https://richardinho.github.io/malebranche-tests/test2/). This looks reasonably good, but the dimensions of the HTML element has no relation to the clip path. The applied clip path simply uses the coordinates as they are in the original SVG element and translates them according to the current position of the HTML element. Resizing the HTML element will have effect at all on the clip path. This is annoying if you want the clip path to fit to the dimensions of the HTML element and scale and resize as it changes. 

Fortunately, this is possible to do. An attribute on the clip path element itself determines how the clip path is applied to a referencing element. By default, it is set to 'userspaceonuse', which means, as we have already observed, that the clip path will use the coordinates of the clip path as they are, but translate them in accordance with the HTML element's position. Another value this attribute can be set to is 'objectBoundingBox'. This means that the path coordinates will be in relation to the size of the referencing html element. However, it is not simply a case of adding the attribute to the clip path element. This will not work. It is also necessary to change the coordinates of the path from absolute ones to relative ones, that is values between 0 and 1. Thus, if an element has a width of 50px, an x coordinate with the value of .5 will be positioned 25 pixels (halfway) from the left edge of the element.

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
