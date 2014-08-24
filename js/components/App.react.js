/**
 * @jsx React.DOM
 */

var React               = require('react'),
 	ProjectSection        = require('./ProjectSection.react'),
  UserSection           = require('./UserSection.react'),
  CheckboxWithLabel     = require('./CheckboxWithLabel.react'),
	ServerActionCreators  = require('../actions/ServerActionCreators'),
  MultiSelectBox        = require('./MultiSelectBox.react'),
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
         "nameLast":"Pacheo",
         "selected":true
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

App = React.createClass({
  
  componentDidMount: function() {

  	ServerActionCreators.createProject();

    ServerActionCreators.fetchAllUsers();

  },

  render: function() {
    return (
      <div className="app">
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
