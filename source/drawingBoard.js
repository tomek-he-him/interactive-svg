import 'babel/polyfill';

import _model from './drawingBoard/model';
import _view from './drawingBoard/view';
import defaultPlugins from './drawingBoard/defaultPlugins';

const HTMLDrawingBoardElement =
  document.registerElement('drawing-board', {
    prototype: Object.assign(
      Object.create(HTMLElement.prototype),
      {
        createdCallback() {

          // Create internal shadow DOM.
          const root = this;
          const shadowRoot = root.createShadowRoot();
          const viewport = document.createElement('svg');
          const content = document.createElement('content');
          viewport.appendChild(content);
          shadowRoot.appendChild(viewport);

          // Save references to the DOM.
          const elements = { root, shadowRoot, viewport };

          // Initialize the model and view.
          const model = _model(this, elements);
          const view = _view(this, elements);

          // Initialize default plugins.
          defaultPlugins.forEach((plugin) => plugin(model, view));

          // Export data.
          Object.assign(this, { model, view, elements });
        },

        attributeChangedCallback: _model.attributeChangedCallback
      }
    )
  })
;

export {
  HTMLDrawingBoardElement,
  defaultPlugins
};
