[![Travis – build status
](https://img.shields.io/travis/tomekwi/interactive-svg/master.svg?style=flat-square)
](https://travis-ci.org/tomekwi/interactive-svg)
 [![Code climate
](https://img.shields.io/codeclimate/github/tomekwi/interactive-svg.svg?style=flat-square)
](https://codeclimate.com/github/tomekwi/interactive-svg)
 [![David – status of dependencies
](https://img.shields.io/david/tomekwi/interactive-svg.svg?style=flat-square)
](https://david-dm.org/tomekwi/interactive-svg)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)
 [![Stability: experimental
](https://img.shields.io/badge/stability-experimental-yellow.svg?style=flat-square)
](https://nodejs.org/api/documentation.html#documentation_stability_index)




&lt;interactive-svg&gt;
=====================

**A navigatable SVG canvas.**  
**Perfect for design apps and maps.**

*Heads up! This is totally a work in progress. Ideas are very welcome :)*




Installation
------------

*interactive-svg* is available through NPM:

```sh
$ npm install interactive-svg
```

– and through bower:

```sh
$ bower install interactive-svg
```




Usage
-----

**First,** import the element and desired plugins – it’s just pure JavaScript. Be sure to import `interactive-svg.register.js` after that – it will register the custom element along with all loaded plugins.

```html
<script src="/path/to/interactive-svg.core.js"></script>
<script src="/path/to/interactive-svg.viewport.js"></script>
<script src="/path/to/interactive-svg.scale.js"></script>
<script src="/path/to/interactive-svg.register.js"></script>
```

If you’re building your app with a module bundler like [*webpack*][], you can also `require` the parts:

```js
var interactiveSvg = require('interactive-svg/core');
var viewport = require('interactive-svg/plugins/viewport');
var scale = require('interactive-svg/plugins/scale');

interactiveSvg({
  plugins: [viewport, scale]
});
```

[webpack]:  https://webpack.github.io


2) Add an `<interactive-svg>` to your document:

```html
<interactive-svg scale=".75">
</interactive-svg>
```

This will create a block element with a base coordinate system. Size it with CSS just like you’d size any other `<div>`.

The coordinate system is nothing more than an anchor for SVG pixels. Set attributes on the `<interactive-svg>` element to describe where and how you want your elements to be displayed.


3) Pack an `<svg>` element inside. Its `viewBox`, `width`, `height` and `style` attributes will be updated automatically as needed:

```html
<interactive-svg scale=".75">
  <svg></svg>
</interactive-svg>

<style> svg { overflow: visible } </style>
```




Features
--------

Every feature is available as a separate plugin. All of them are currently in development – ideas and criticism are very welcome.


### `zoom`

```html
<interactive-svg
  zoom.speed="3"
  >
  <!-- ... -->
</interactive-svg>
```

- Enables zooming content in the viewport with the mouse wheel and the pinch-zoom event.


### `pan`

```html
<interactive-svg
  pan.mouse-button="right"
  >
  <!-- ... -->
</interactive-svg>
```

- Enables panning content in the viewport with the mouse and the touch-drag event.


### `scale`

```html
<interactive-svg
  scale="1.5"
  >
  <!-- ... -->
</interactive-svg>
```

- Requires the plugin `viewport`.

- Supports relative units. `1.5` means *150%*.

- `scale="1"` means “*1 SVG pixel* = *1 CSS pixel*.”


### `target`

```html
<interactive-svg
  target.x="100"
  target.y="-50"
  >
  <!-- ... -->
</interactive-svg>
```

- The above says “the point at *(100, -50) SVG pixels* is at the center of the `<interactive-svg>`”

- Supports all SVG units. Unitless means pixels, just like in SVG.


### `viewport`

```html
<interactive-svg
  viewport.width="400px"
  viewport.height="200px"
  style="width: 400px; height: 200px"
  >
  <!-- ... -->
</interactive-svg>
```

- The above tells the `<interactive-svg>` “your DOM element is 400 pixels wide”

- Supports all CSS units.

- I’m thinking of an opt-out, implicit `viewport="auto"` which would poll and update the element’s dimensions. Please let me know what you think in an issue.


### `canvas`

```html
<interactive-svg
  canvas.width="10000"
  canvas.height="6000"
  >
  <!-- ... -->
</interactive-svg>
```

- The above will limit panning and zooming to an area of *10000 × 6000 SVG pixels*




License
-------

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
