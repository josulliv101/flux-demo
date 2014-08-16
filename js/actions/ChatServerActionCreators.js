var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher'),
    ChatConstants     = require('../constants/ChatConstants'),
    ChatWebAPIUtils   = require('../utils/ChatWebAPIUtils'),
    ActionTypes       = ChatConstants.ActionTypes;

module.exports = {

  getAllProjects: function(count) {

    ChatAppDispatcher.handleServerAction({
      type: ActionTypes.GET_ALL_PROJECTS,
      promise: ChatWebAPIUtils.getAllProjects(count)
    });
  },

  receiveAllProjects: function(rawProjects) {

    ChatAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_PROJECTS,
      rawProjects: rawProjects
    });
  },

  createProject: function() {

    ChatAppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_PROJECT
    });
  },

  removeProject: function() {

    ChatAppDispatcher.handleServerAction({
      type: ActionTypes.REMOVE_PROJECT
    });
  }

};
