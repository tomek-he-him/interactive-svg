import 'babel/polyfill';

import _model from './drawingBoard/model';
import _view from './drawingBoard/view';
import defaultPlugins from './drawingBoard/defaultPlugins';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XMLNS_NS = 'http://www.w3.org/2000/xmlns/';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const HTMLDrawingBoardElement =
  document.registerElement('drawing-board', {
    prototype: Object.assign(
      Object.create(HTMLElement.prototype),
      {
        createdCallback() {

          // Create internal shadow DOM.
          const root = this;
          const shadowRoot = root.createShadowRoot();

          const style = document.createElement('style');
          style.textContent = '#v{overflow:hidden}';
          shadowRoot.appendChild(style);

          const viewport = document.createElementNS(SVG_NS, 'svg');
          const content = document.createElement('content');
          viewport.setAttributeNS(XMLNS_NS, 'xmlns:xlink', XLINK_NS);
          viewport.setAttribute('id', 'v');
          viewport.appendChild(content);
          shadowRoot.appendChild(viewport);

          // Save references to the DOM.
          const elements = { root, shadowRoot, viewport };

          // Initialize the model and view.
          const model = _model(root);
          const view = _view(viewport);

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
