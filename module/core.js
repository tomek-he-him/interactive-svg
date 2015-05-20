import assign from 'object-assign';
import arrayFrom from 'array-from';
import arrayFind from 'array-find';

import createModel from './core/model';
import createView from './core/view';

export default ({plugins}) => {
  return document.registerElement('interactive-svg', {
    prototype: assign(
      Object.create(HTMLElement.prototype),
      {
        createdCallback() {

          const root = this;
          const viewport = arrayFind(
            arrayFrom(root.children),
            (node) => node.tagName.toLowerCase() === 'svg'
          );
          if (!viewport) throw new Error('interactive-svg: ' +
            'No `<svg>` element found. Make sure your `<interactive-svg>` ' +
            'has an `<svg>` as a direct child.'
          );

          // Save references to the DOM.
          const elements = {root, viewport};

          // Initialize the model and view.
          const model = createModel(root);
          const view = createView(viewport);

          // Initialize default plugins.
          plugins.forEach((plugin) => plugin({model, view, elements}));

          // Export data.
          assign(this, {model, view, elements});
        },

        attributeChangedCallback: createModel.attributeChangedCallback
      }
    )
  });
};
