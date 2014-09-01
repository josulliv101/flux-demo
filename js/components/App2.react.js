/** @jsx React.DOM */
var App, React = require('react'),
    Stores = require('./WatchStoresMixin'),
    Tab = require('./Tab.react'),
    ServerActionCreators  = require('../actions/ServerActionCreators');

var Router = require('react-router');
var Link = Router.Link;

App = React.createClass({

  mixins: [ Stores ],

  componentDidMount: function() {

    ServerActionCreators.fetchAllUsers();
    
    ServerActionCreators.getAllProjects();

  },

  getStateFromStores: function() {

    return {

      user: Stores.Users.getActiveUser() || {},

      users: Stores.Users.getAll() || [],

      isUsersLoading: Stores.Users.isLoading()
      
    };

  },

  render: function() {

    return (

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-pills nav-stacked">
              <Tab to="dashboard">Dashboard</Tab>
              <Tab to="workbench">Workbench</Tab>
              <Tab to="reports">Reports</Tab>
              <Tab to="settings">Settings</Tab>
            </ul>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Dashboard</h1>
            <h2 className="sub-header">Section title</h2>
            <div>
              <p className="text-info">Hello World : <Link to="workbench">test</Link></p>
              <div>
                {this.props.activeRouteHandler()}
              </div>
            </div>
          </div>
        </div>
      </div>

    );

  }

});

module.exports = App;
