/**
 * @jsx React.DOM
 */

var React               = require('react'),
 	ProjectSection        = require('./ProjectSection.react'),
  UserStore             = require('../stores/UserStore'),
  UserSection           = require('./UserSection.react'),
  CheckboxWithLabel     = require('./CheckboxWithLabel.react'),
	ServerActionCreators  = require('../actions/ServerActionCreators'),
  MultiSelectBox        = require('./MultiSelectBox.react'),
  TopNavMenu            = require('./TopNavMenu.react'),
	App;

var data = [
      {
         "nameFirst":"Carlos",
         "nameLast":"Pacheo"
      },
      {
         "nameFirst":"Claudio",
         "nameLast":"Mathews",
         "selected":true
      },
      {
         "nameFirst":"Frank",
         "nameLast":"Pacheo"
      },
      {
         "nameFirst":"Jose",
         "nameLast":"Mathews"
      },
      {
         "nameFirst":"Laura",
         "nameLast":"Pacheo"
      },
      {
         "nameFirst":"Maria",
         "nameLast":"Mathews"
      },
      {
         "nameFirst":"Tom",
         "nameLast":"Patrick"
      },
      {
         "nameFirst":"Mark",
         "nameLast":"Barter"
      },
      {
         "nameFirst":"Nancy",
         "nameLast":"Barter"
      },
      {
         "nameFirst":"Jon",
         "nameLast":"Fish"
      },
      {
         "nameFirst":"Elmer",
         "nameLast":"Fudd",
         "selected": true
      },
      {
         "nameFirst":"Andy",
         "nameLast":"Avett"
      },
      {
         "nameFirst":"Neal",
         "nameLast":"Peters"
      }
   ];

data.forEach(function(item, i) {

    item.id = ++i;

});

function getStateFromStores() {

  return {

    users: UserStore.getAll(),

    user: UserStore.getActiveUser() || {},

    isUsersLoading: UserStore.isLoading()
    
  };
}

App = React.createClass({
  
  componentDidMount: function() {

  	ServerActionCreators.createProject();

    ServerActionCreators.fetchAllUsers();

    UserStore.addChangeListener(this._onChange);

  },

  getInitialState: function() {

    return getStateFromStores();

  },

  componentWillUnmount: function() {

    UserStore.removeChangeListener(this._onChange);

  },

  _onChange: function() {

    this.setState(getStateFromStores());

  },

  render: function() {

    return (
      <div className="app container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Brand</a>
            </div>
            <TopNavMenu />
          </div>
        </nav>

        <div className="">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10 text-right"><p className="text-muted">{this.state.user.fname}, you are currently logged in as a <strong>{this.state.user.role}</strong>.</p></div>
          </div>
        </div>

        <MultiSelectBox initialMode="edit-read-only" initialItems={data} filterPlaceholder="Filter by name" formatItemLabel={function(item) { return item.nameFirst + " " + item.nameLast; }} />
      </div>
    );
  },

  _onClickAdd: function() {
    
    ServerActionCreators.createProject();

  },

  _onClickRemove: function() {
    
    ServerActionCreators.removeProject();

  }

});

module.exports = App;
