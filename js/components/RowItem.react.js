/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx');

var RowItem = React.createClass({

  getInitialState: function() {

    return { selected: this.props.initSelected };

  },

  render: function() {

    return (<li className={cx({

          'selected': this.state.selected === true

      })} >{this.props.name}</li>);

  }

});

module.exports = RowItem;