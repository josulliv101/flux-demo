/**
 * @jsx React.DOM
 */

var React               = require('react'),
 	ProjectSection        = require('./ProjectSection.react'),
  UserSection           = require('./UserSection.react'),
	ServerActionCreators  = require('../actions/ServerActionCreators'),
	App;

App = React.createClass({
  
  componentDidMount: function() {

  	ServerActionCreators.createProject();

    ServerActionCreators.fetchAllUsers();

  },

  render: function() {
    return (
      <div className="app">
        <ProjectSection />
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
