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
         "id":"1965-11-15",
         "nameFirst":"Carlos",
         "nameLast":"Pacheo",
         "nameMiddle":"",
         "sexCd":"M",
         "sexCdText":"Male",
         "subjectCid":"NEW-36534",
         "subjectId":200000392
      },
      {
         "id":"1975-03-05",
         "nameFirst":"Claudio",
         "nameLast":"Mathews",
         "nameMiddle":"Olivio",
         "sexCd":"M",
         "sexCdText":"Male",
         "subjectCid":"PT-98979",
         "subjectId":200000792,
         "selected":true
      },
      {
         "id":"1945-04-09",
         "nameFirst":"Frank",
         "nameLast":"Pacheo",
         "nameMiddle":"",
         "sexCd":"M",
         "sexCdText":"Male",
         "subjectCid":"PT-09834",
         "subjectId":200000790
      },
      {
         "id":"1945-04-09",
         "nameFirst":"Jose",
         "nameLast":"Mathews",
         "nameMiddle":"",
         "sexCd":"M",
         "sexCdText":"Male",
         "subjectCid":"NEW-98344",
         "subjectId":200000390
      },
      {
         "id":"1948-09-21",
         "nameFirst":"Laura",
         "nameLast":"Pacheo",
         "nameMiddle":"Madelena",
         "sexCd":"F",
         "sexCdText":"Female",
         "subjectCid":"PT-23422",
         "subjectId":200000791,
         "selected":true
      },
      {
         "id":"1948-09-21",
         "nameFirst":"Maria",
         "nameLast":"Mathews",
         "nameMiddle":"",
         "sexCd":"F",
         "sexCdText":"Female",
         "subjectCid":"NEW-34534",
         "subjectId":200000391
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
        <MultiSelectBox initialMode="edit-read-only" initialItems={data} formatItemLabel={function(item) { return item.nameFirst + " " + item.nameLast; }} />
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
