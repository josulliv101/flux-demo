
var ChatAppDispatcher   = require('../dispatcher/ChatAppDispatcher'),
    ChatConstants       = require('../constants/ChatConstants'),
    ChatMessageUtils    = require('../utils/ChatMessageUtils'),
    EventEmitter        = require('events').EventEmitter,
    merge               = require('react/lib/merge'),

    ActionTypes         = ChatConstants.ActionTypes,
    CHANGE_EVENT        = 'change',

    _projects           = [];

function _addProject(model) {

  _projects[model.id] = model;

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
  }

});

ProjectStore.dispatchToken = ChatAppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CREATE_PROJECT:
      var message = ProjectStore.getCreatedMessageData(action.text);
      _messages[message.id] = message;
      ProjectStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_PROJECTS:
      ProjectStore.init(action.rawProjects);
      ProjectStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = ProjectStore;
