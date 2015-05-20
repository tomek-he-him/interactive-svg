/* global interactiveSvg */
import core from './core';

if (typeof interactiveSvg === 'object') {
  interactiveSvg.HTMLInteractiveSvgElement = core({
    plugins: Object.keys(interactiveSvg)
      .filter((key) => interactiveSvg[key].type === 'plugin')
      .map((key) => interactiveSvg[key])
    ,
  });
}

else console.warn(
  'interactiveSvg.register: interactiveSvg.core isn’t loaded.'
);
