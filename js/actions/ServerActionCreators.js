var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../constants/Constants'),
    WebAPIUtils   = require('../utils/mockWebAPIUtils'), 
    ActionTypes   = Constants.ActionTypes;

module.exports = {

  getAllProjects: function(count) {

    AppDispatcher.handleServerAction({

      type: ActionTypes.GET_ALL_PROJECTS,

      promise: WebAPIUtils.getAllProjects(count || 10)

    });
  },

  receiveAllProjects: function(rawProjects) {

    AppDispatcher.handleServerAction({

      type: ActionTypes.RECEIVE_RAW_PROJECTS,

      rawProjects: rawProjects.data || rawProjects

    });
  },

  fetchAllUsers: function() {

    AppDispatcher.handleServerAction({

      type: ActionTypes.FETCH_ALL_USERS,

      promise: WebAPIUtils.fetchAllUsers(10)

    });
  },

  setActiveUser: function(user) {

    AppDispatcher.handleServerAction({

      type: ActionTypes.SET_ACTIVE_USER,

      user: user

    });

  },

  setActiveUserRole: function(role) {

    AppDispatcher.handleServerAction({

      type: ActionTypes.SET_ACTIVE_USER_ROLE,

      role: role

    });

  },

  receiveAllUsers: function(rawUsers) {

    AppDispatcher.handleServerAction({

      type: ActionTypes.RECEIVE_RAW_USERS,

      rawUsers: rawUsers

    });
  },

  createProject: function() {

    AppDispatcher.handleServerAction({

      type: ActionTypes.CREATE_PROJECT

    });
  },

  removeProject: function() {

    AppDispatcher.handleServerAction({

      type: ActionTypes.REMOVE_PROJECT

    });
  }
};
