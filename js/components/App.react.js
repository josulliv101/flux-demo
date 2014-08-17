/**
 * @jsx React.DOM
 */

var React               = require('react'),
 	ProjectSection        = require('./ProjectSection.react'),
	ServerActionCreators  = require('../actions/ServerActionCreators'),
	App;

App = React.createClass({
  
  componentDidMount: function() {

  	ServerActionCreators.createProject();

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
    
    ServerActionCreators.createProject();

  },

  _onClickRemove: function() {
    
    ServerActionCreators.removeProject();

  }

});

module.exports = App;
