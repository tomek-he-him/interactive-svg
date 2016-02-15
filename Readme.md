[![Travis – build status](https://img.shields.io/travis/tomekwi/interactive-svg/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/interactive-svg) [![David – status of dependencies](https://img.shields.io/david/tomekwi/interactive-svg.svg?style=flat-square)](https://david-dm.org/tomekwi/interactive-svg) [![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript) [![Stability: experimental](https://img.shields.io/badge/stability-experimental-yellow.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index)




# &lt;interactive-svg&gt;

**A navigatable SVG canvas  
Perfect for design apps and maps.**

*Heads up! This is totally a work in progress. Ideas are very welcome :)*




## Installation

*interactive-svg* is available through NPM:

```sh
$ npm install interactive-svg
```




## Usage

**1**

**If you’re fine using `<script>` tags,** import the desired plugins and register the element. All plugins loaded before `interactive-svg.register.js` will be registered by default on every `<interactive-svg>` element.

```html
<script src="PATH/TO/interactive-svg.viewport.js"></script>
<script src="PATH/TO/interactive-svg.scale.js"></script>
<script src="PATH/TO/interactive-svg.register.js"></script>
```

By default, `PATH/TO` is something like `node_modules/parametric-svg/dist`.


**If you’re building your app with a bundler** like *webpack* or *browserify*, you can also `require` the parts:

```js
const interactiveSvg = require('interactive-svg/core');
const viewport = require('interactive-svg/plugins/viewport');
const scale = require('interactive-svg/plugins/scale');

interactiveSvg({
  plugins: [viewport, scale]
});
```


**2**

Add an `<interactive-svg>` to your document. Pack an `<svg>` element inside.

```html
<interactive-svg>
  <svg></svg>
</interactive-svg>
```


**3**

Add attributes to your `<interactive-svg>`.

```html
<interactive-svg
  viewport="500 × 300"
  scale="2"
  ><svg></svg>
</interactive-svg>
```

The `viewBox`, `width`, `height` and `style` of the `<svg>` will be updated automatically as needed.




## Features

Every feature is available as a separate plugin. All of them are currently in development – ideas and criticism are very welcome.


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
  viewport="400 × 200"
  >
  <!-- ... -->
</interactive-svg>
```

- The above tells the `<interactive-svg>` “your DOM element is 400 pixels wide”

- Supports all CSS units.

- I’m thinking of an opt-out, implicit `viewport="auto"` which would poll and update the element’s dimensions. Please let me know what you think in an issue.




## License

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
