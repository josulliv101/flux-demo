
var ChatAppDispatcher   = require('../dispatcher/ChatAppDispatcher'),
    ChatConstants       = require('../constants/ChatConstants'),
    ChatMessageUtils    = require('../utils/ChatMessageUtils'),
    ChatServerActionCreators = require('../actions/ChatServerActionCreators'),
    EventEmitter        = require('events').EventEmitter,
    merge               = require('react/lib/merge'),
    $                   = require('jquery'),

    ActionTypes         = ChatConstants.ActionTypes,
    CHANGE_EVENT        = 'change',

    _projects           = [],
    _count              = 0,
    _isLoading          = true;

function _addProject(model) {

  _projects[model.id] = model;

}

function _incrementCount(step) {

  step || (step = 1);

  _count = Math.max(0, _count + step);

  return _count;

}

var ProjectStore = merge(EventEmitter.prototype, {

  init: function(rawProjects) {
    _projects = rawProjects;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _projects[id];
  },

  getAll: function() {
    return _projects;
  },

  getCount: function() {
    return _count;
  },

  isLoading: function() {
    return _isLoading;
  }

});

ProjectStore.dispatchToken = ChatAppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_PROJECTS:
      _isLoading = false;
      ProjectStore.init(action.rawProjects);
      ProjectStore.emitChange();
      break;

    case ActionTypes.GET_ALL_PROJECTS:
      _isLoading = true;
      $.when(action.promise).done( ChatServerActionCreators.receiveAllProjects );
      ProjectStore.emitChange(); // For loading attr
      break;

    case ActionTypes.CREATE_PROJECT:

      _incrementCount();

      console.log('_incrementCount:post', _count);

      window.setTimeout(function () {

        ChatServerActionCreators.getAllProjects(_count);

      }, 0);

      break;

    case ActionTypes.REMOVE_PROJECT:

      _incrementCount(-1);

      console.log('_incrementCount -1 :post', _count);

      window.setTimeout(function () {

        ChatServerActionCreators.getAllProjects(_count);

      }, 0);

      break;

    default:
      // do nothing
  }

});

module.exports = ProjectStore;
