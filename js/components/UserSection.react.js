/**
 * @jsx React.DOM
 */

var React                 = require('react'),
    UserStore             = require('../stores/UserStore'),
    ProjectListItem       = require('../components/ProjectListItem.react'),
    ServerActionCreators  = require('../actions/ServerActionCreators'),
    cx                    = require('react/lib/cx');

function _name(model) {

  if (!model) return;

  return model.fname + ' ' + model.lname;

}

function getStateFromStores() {

  return {

    users: UserStore.getAll(),

    userActive: UserStore.getActiveUser(),

    isLoading: UserStore.isLoading()
    
  };
}

var UserSection = React.createClass({

  getInitialState: function() {

    return getStateFromStores();

  },

  componentDidMount: function() {

    UserStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {

    UserStore.removeChangeListener(this._onChange);

  },

  render: function() {

    var total = this.state.users.length,

        userListItems = this.state.users.map(function(user, i) {

          return ( <ProjectListItem isActive={user.id === this.state.userActive.id} key={user.id} index={i} name={user.fname + ' ' + user.lname} count={ UserStore.getCount() } clickHandler={this._setActiveUser.bind(this, user)} /> );

        }, this);

    return (
      <div
        className={cx({
          'section': true,
          'user-section': true,
          'is-loading': this.state.isLoading
      })}>
          <div className="spinner"></div>
          <h4>Users ({total})</h4>
          <p>Active User: {_name(this.state.userActive)}</p>
          <ul className="list">
            {userListItems}
          </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {

    this.setState(getStateFromStores());

  },

  _setActiveUser: function(user) {

    ServerActionCreators.setActiveUser(user);

  }

});

module.exports = UserSection;
