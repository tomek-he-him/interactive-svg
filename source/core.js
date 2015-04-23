import 'babel/polyfill';

import _model from './core/model';
import _view from './core/view';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XMLNS_NS = 'http://www.w3.org/2000/xmlns/';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const defaultPlugins = new Set();

const HTMLDrawingBoardElement =
  document.registerElement('drawing-board', {
    prototype: Object.assign(
      Object.create(HTMLElement.prototype),
      {
        createdCallback() {

          // Create internal DOM. We’d love to use shadow DOM here. But alas SVG
          // support in shadow DOM is flaky. So unfortunately we need to expose
          // the guts.
          const root = this;
          const viewport = document.createElementNS(SVG_NS, 'svg');
          viewport.setAttributeNS(XMLNS_NS, 'xmlns:xlink', XLINK_NS);

          let firstChild;
          while ((firstChild = root.firstChild)) {
            viewport.appendChild(firstChild);
          }
          root.appendChild(viewport);

          // Save references to the DOM.
          const elements = { root, viewport };

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
