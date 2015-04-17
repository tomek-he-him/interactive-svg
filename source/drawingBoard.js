import 'babel/polyfill';

import _model from './drawingBoard/model';
import _view from './drawingBoard/view';
import defaultPlugins from './drawingBoard/defaultPlugins';

const HTMLDrawingBoardElement =
  document.registerElement('drawing-board', {
    prototype: Object.assign(
      Object.create(HTMLElement),
      {
        createdCallback() {

          // Initialize the model and view.
          const model = _model(this);
          const view = _view(this);

          // Initialize default plugins.
          defaultPlugins.forEach((plugin) => plugin(model, view));

          // Export data.
          Object.assign(this,
            { model, view }
          );
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
