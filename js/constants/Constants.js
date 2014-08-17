var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_PROJECTS: null,
    GET_ALL_PROJECTS: null,
    CREATE_PROJECT: null,
    REMOVE_PROJECT: null,
    RECEIVE_RAW_USERS: null,
    FETCH_ALL_USERS: null,
    SET_ACTIVE_USER: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
