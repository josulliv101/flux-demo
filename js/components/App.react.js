/**
 * @jsx React.DOM
 */

var React               = require('react'),
 	ProjectSection        = require('./ProjectSection.react'),
  UserSection           = require('./UserSection.react'),
  CheckboxWithLabel     = require('./CheckboxWithLabel.react'),
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
        <CheckboxWithLabel labelOn="Label On" labelOff="Label Off" />
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
