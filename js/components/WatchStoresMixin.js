/** @jsx React.DOM */
var StoresMixin, React = require('react'),

    UserStore  = require('../stores/UserStore');


StoresMixin = {

  componentDidMount: function() {

    UserStore.addChangeListener(this._onStoreChange);

  },

  getInitialState: function() {

    return this.getStateFromStores();

  },

  componentWillUnmount: function() {

    UserStore.removeChangeListener(this._onStoreChange);

  },

  getUserStore: function() {

    return UserStore;

  },

  _onStoreChange: function() {

    this.setState(this.getStateFromStores());

  }

};

StoresMixin.Users = UserStore;

module.exports = StoresMixin;