/**
 * @jsx React.DOM
 */

var React = require('react'),
 	ProjectSection = require('./ProjectSection.react'),
	ChatServerActionCreators = require('../actions/ChatServerActionCreators'),
	ChatApp;


App = React.createClass({
  
  componentDidMount: function() {

  	ChatServerActionCreators.createProject();

  },

  render: function() {
    return (
      <div className="app">
      	<button onClick={this._onClickAdd}>Add</button>
      	<button onClick={this._onClickRemove}>Remove</button>
        <ProjectSection />
      </div>
    );
  },

  _onClickAdd: function() {
    
    ChatServerActionCreators.createProject();

  },

  _onClickRemove: function() {
    
    ChatServerActionCreators.removeProject();

  }

});

module.exports = App;
