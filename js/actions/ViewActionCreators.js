var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../constants/Constants'),
    ActionTypes   = Constants.ActionTypes;

module.exports = {

  showModal: function(isVisible) {

    AppDispatcher.handleViewAction({

      type: ActionTypes.SHOW_MODAL,

      modal: isVisible

    });
  }
};
