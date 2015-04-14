[![Travis – build status](https://img.shields.io/travis/tomekwi/drawing-board/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/drawing-board)
 
[![Code climate](https://img.shields.io/codeclimate/github/tomekwi/drawing-board.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/drawing-board)
 
[![David – status of dependencies](https://img.shields.io/david/tomekwi/drawing-board.svg?style=flat-square)](https://david-dm.org/tomekwi/drawing-board)
 
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)




&lt;drawing-board&gt;
=====================

**A navigatable SVG canvas.**  
**Perfect for web-based design apps.**




Installation
------------

*drawing-board* is available through NPM:

```sh
$ npm install drawing-board
```

– and through bower:

```sh
$ bower install drawing-board
```




Usage
-----

1) Import the element – it’s just pure JavaScript:

```html
<script src="/path/to/drawing-board.min.js"></script>
```


2) Add a `<drawing-board>` to your document:

```html
<drawing-board
  scale="0.75"
  >
</drawing-board>
```

This will create a block element with a base coordinate system. Size it with CSS just like you’d size any other `<div>`.

The coordinate system is nothing more than an anchor for SVG pixels. Set attributes on the `<drawing-board>` element to describe where and how you want your elements to be displayed.


3) Pack your `<svg>` elements inside:

```html
<drawing-board
  scale="0.75"
  >

  <!--
  An <svg> element you put here will have its (0, 0) point aligned with the
  (0, 0) of the <drawing-board> – unless you set it otherwise. Read on.
  -->
  <svg>
    <circle r="201" />
  </svg>

  <!--
  You can stuff many small <svg> elements here – or keep everything in one fat
  <svg>. It's up to you.
  -->
  <svg>
    <defs><clipPath id="outer">
      <circle r="200" />
    </clipPath></defs>
    <image
      x="-200" y="-200"
      width="400" height="400"
      xlink:href="http://placeimg.com/400/400/any"
      style="clip-path: url(#outer)"
    />
  </svg>

  <!--
  Move individual <svg>s by specifying their `x` and `y` attributes. This one
  will have its internal (0, 0) point at the <drawing-board>’s (-10, 0).
  -->
  <svg x="-10">
    <circle
      cx="10"
      r="25"
      fill="white"
      stroke="black" stroke-width="1"
    />
  </svg>
  
</drawing-board>

<style> svg {overflow: visible} </style>
```

The markup above will result in something similar to this:

<p align="center">
  <img
    src="Readme/example.png"
    width="302" height="302"
  />
</p>



License
-------

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
