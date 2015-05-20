import assign from 'object-assign';
import arrayFrom from 'array-from';
import arrayFind from 'array-find';

import _model from './core/model';
import _view from './core/view';

export default ({plugins}) => {
  return document.registerElement('interactive-svg', {
    prototype: assign(
      Object.create(HTMLElement.prototype),
      {
        createdCallback() {

          const root = this;
          const viewport = arrayFind(
            arrayFrom(root.children),
            (node) => node.tagName === 'SVG'
          );
          if (!viewport) throw new Error('interactive-svg: ' +
            'No `<svg>` element found. Make sure your `<interactive-svg>` ' +
            'has an `<svg>` as a direct child.'
          );

          // Save references to the DOM.
          const elements = { root, viewport };

          // Initialize the model and view.
          const model = _model(root);
          const view = _view(viewport);

          // Initialize default plugins.
          plugins.forEach((plugin) => plugin({model, view, elements}));

          // Export data.
          assign(this, {model, view, elements});
        },

        attributeChangedCallback: _model.attributeChangedCallback
      }
    )
  });
};
