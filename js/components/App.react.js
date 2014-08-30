/** @jsx React.DOM */
var App, React = require('react'),

    MultiSelectBox = require('./MultiSelectBox.react'),

    TopNavMenu = require('./TopNavMenu.react'),

    Stores = require('../components/WatchStoresMixin'),

    ServerActionCreators  = require('../actions/ServerActionCreators');


App = React.createClass({
  
  mixins: [ Stores ],

  componentDidMount: function() {

    ServerActionCreators.fetchAllUsers();

  },

  getStateFromStores: function() {

    return {

      user: Stores.Users.getActiveUser() || {},

      users: Stores.Users.getAll() || [],

      isUsersLoading: Stores.Users.isLoading()
      
    };

  },

  render: function() {

    var appGetStateFromStores = this.getStateFromStores.bind(this);

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
            <TopNavMenu ref="myNav" customGetStateFromStoresFn={appGetStateFromStores} />
          </div>
        </nav>
        <div className="">
          <div className="row">
            <div className="col-md-4">There are {this.state.users.length} users fetched.</div>
            <div className="col-md-8 text-right"><p className="text-muted">{this.state.user.fname}, you are currently logged in as a <strong>{this.state.user.role}</strong>.</p></div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <MultiSelectBox ref="myCollaborators" initialMode="edit-read-only" filterPlaceholder="Filter by name" formatItemLabel={function(item) { return item.fname + " " + item.lname; }} />
          </div>
        </div>
        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );

  }

});

module.exports = App;
