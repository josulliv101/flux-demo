/**
 * @jsx React.DOM
 */

var React                = require('react'), 
    ServerActionCreators = require('../actions/ServerActionCreators'),
    cx                    = require('react/lib/cx'),
    ProjectListItem;

ProjectListItem = React.createClass({

  render: function() {
    return (
      <li className={cx({
          'btn btn-default': true,
          'active': this.props.isActive
      })} onClick={this._onClick}>
        <a href="#">Project {this.props.name} 8000</a>
      </li>
    );
  },

  _onClick: function() {

    this.props.clickHandler(this.props.count);

  }

});

module.exports = ProjectListItem;