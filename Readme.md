[![Build status](https://img.shields.io/travis/tomekwi/drawing-board.html/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/drawing-board.html)
 [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/drawing-board.html.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/drawing-board.html)
 [![David DM](https://img.shields.io/david/tomekwi/drawing-board.html.svg?style=flat-square)](http://david-dm.org/tomekwi/drawing-board.html)




&lt;drawing-board&gt;
=====================

**A navigatable SVG canvas.**  
**The perfect hit for web-based design apps.**




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

3) Pack your `<svg>` elements inside:

```html
<drawing-board
  scale="0.75"
  >

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

  <svg x="-10">
    <circle cx="10"
      r="20"
      fill="white"
    />
  </svg>
  
</drawing-board>
```




License
-------

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
