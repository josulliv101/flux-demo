/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx'),

    _ = require('underscore'),

    MultiSelectBox = require('./MultiSelectBox.react'),

    ProjectSection = require('./ProjectSection.react');


module.exports = React.createClass({


  render: function() {

    return (
      <div className={cx({

      })}>
        <div className="row">
          <div className="col-md-3">
            <ProjectSection />
          </div>
          <div className="col-md-4">
            <ProjectSection />
          </div>
          <div className="col-md-5">
            <MultiSelectBox ref="myCollaborators2" initialMode="edit-read-only" filterPlaceholder="Filter by name" formatItemLabel={function(item) { return item.fname + " " + item.lname; }} />
          </div>
        </div>
      </div>
    );
  }
});