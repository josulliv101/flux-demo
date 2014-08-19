/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx'),

    _ = require('underscore'),

    MultiSelectBox;

MultiSelectBox = React.createClass({

  getInitialState: function() {

    return { 

      isChecked: false,

      isDirty: false,

      showCheckedItemsOnly: false,

      isFilterActive: false,

      mode: 'read-only',

      selectedTotal: 0

    };

  },

  getDefaultProps: function() {

    return {

      items: []

    };

  },

  componentWillMount: function() {

    this.setState({ selectedTotal: this.getSelectedTotal() });

  },

  onClick: function(state, event) {

    this.setState(state);

  },

  handleItemClick: function(item) {

    item.selected = !item.selected;

    //this.setState({ selectedTotal: this.getSelectedTotal() });

  },

  getSelectedTotal: function() {

    return 33; //_.filter(this.props.items, function(item) { return item.selected === true; }).length

  },

  render: function() {

    var items = (this.props.items).map(function(item, i) {

      return ( <tr className={cx({ selected: item.selected })}  ><td>test {i}</td></tr> );

    });

    return (

      <div className={cx({

          'bd item-orange clearfix': true,

          'read-only': this.state.mode === 'read-only',

          'edit-read-only': this.state.mode === 'edit-read-only',

          'edit': this.state.mode === 'edit',

          'dirty': this.state.isDirty,

          'is-filter-active': this.state.isFilterActive

      })}>

        <div className="header">

          <div className="filter">

            <input type="text" placeholder="filter by name" />

            <label>x</label>

          </div>

        </div>

        <label className="message">Unsaved...</label>

        <label className="selected"><em>{this.state.getSelectedTotal}</em> selected</label>

        <label className="filter-remove"><span>x</span>Clear Filter</label>

        <div className="tbl-div">

          <table>

            <tbody>

              {items}

            </tbody>

          </table>

          <div className="tbl-message">No items are currently checked. <label>View all items</label>.</div>

        </div>

        <ul class="display-options">

          <li>Show checked only</li>

        </ul>

        <ul className="btn-group">

          <li className="btn btn-add" onClick={this.onClick.bind(this, { mode: 'edit' })}>add</li>

          <li className="btn btn-select" onClick={this.onClick.bind(this, { mode: 'edit' })}>select</li>

          <li className="btn btn-use" onClick={this.onClick.bind(this, { mode: 'read-only' })}>use</li>

          <li className="btn btn-back" onClick={this.onClick.bind(this, { mode: 'read-only' })}>back</li>

        </ul>

      </div>

    );

  }

});

module.exports = MultiSelectBox;