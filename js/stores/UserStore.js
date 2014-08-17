
var AppDispatcher         = require('../dispatcher/AppDispatcher'),
    Constants             = require('../constants/Constants'),
    ServerActionCreators  = require('../actions/ServerActionCreators'),
    EventEmitter          = require('events').EventEmitter,
    merge                 = require('react/lib/merge'),
    $                     = require('jquery'),
    _                     = require('underscore'),

    ActionTypes           = Constants.ActionTypes,
    CHANGE_EVENT          = 'change',

    _users                = [],
    _activeUser           = null,
    _isLoading            = true;
 

var UserStore = merge(EventEmitter.prototype, {

  init: function(rawUsers) {
    _users = rawUsers;
    if (_activeUser === null && _users.length > 0) {

      _activeUser = _.first(_users);

    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _user[id];
  },

  getAll: function() {
    return _users;
  },

  getCount: function() {
    return _users.length;
  },

  getActiveUser: function() {
    return _activeUser;
  },

  isLoading: function() {
    return _isLoading;
  }

});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_USERS:
      _isLoading = false;
      UserStore.init(action.rawUsers);
      UserStore.emitChange();
      break;

    case ActionTypes.FETCH_ALL_USERS:
      _isLoading = true;
      
      $.when(action.promise).done( ServerActionCreators.receiveAllUsers );
      UserStore.emitChange(); // For loading attr
      break;

    case ActionTypes.SET_ACTIVE_USER:
      _activeUser = action.user;
      UserStore.emitChange(); // For loading attr
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
