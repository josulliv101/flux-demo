/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx'),

    _ = require('underscore'),

    SelectableItemsMixin = require('../components/SelectableItemsMixin');

function _filterItems(items, q) {

  if (_.isEmpty(q)) return items;

  return _.filter(items, function(item) { return item.name.indexOf(q) === 0; });

}

module.exports = React.createClass({

  mixins: [ React.addons.LinkedStateMixin, SelectableItemsMixin ],

  getInitialState: function() {

    var items = [{ id: 1, name: 'Joe', lname: 'Sullivan', selected: true }, { id: 2, name: 'Magg', lname: 'Sullivan' }, { id: 3, name: 'Joseph', lname: 'Sullivan' }];

    return { 

      isDirty: false,

      showCheckedItemsOnly: false,

      filterText: '',

      mode: 'read-only',

      selectedIds: this.getSelected(items),

      items: items

    };
  },

  _onChange: function(stateAttrs) {

    this.setState(stateAttrs);

  },

  render: function() {

    var items = ( _filterItems(this.state.items, this.state.filterText) ).map(function(item, i) {

        return ( <li className={cx({ selected: this.isItemIdSelected(item.id) })} onClick={this.toggleItem.bind(this, item.id)} ><td>test {i}</td></li> );

      }, this);

    return (

      <div className={cx({

          'bd item-orange clearfix': true,

          'read-only': this.state.mode === 'read-only',

          'edit-read-only': this.state.mode === 'edit-read-only',

          'edit': this.state.mode === 'edit',

          'dirty': !_.isEqual(this.origSelectedIds, this.state.selectedIds),

          'filter-active': !_.isEmpty(this.state.filterText),

          'show-checkbox-only': this.state.showCheckedItemsOnly

      })}>

        <div className="filter">

          <input className="txtbox-filter" type="text" placeholder="filter by name" valueLink={this.linkState('filterText')} />

          <label>x</label>

        </div>

        <label className="message">Unsaved...</label>

        <label className="selected"><em>{this.state.selectedIds.length}</em> selected</label>

        <label className="filter-remove"><span>x</span>Clear Filter</label>

        <ul className="tbl-div">{items}</ul>

        <div className="tbl-message">No items are currently checked. <label>View all items</label>.</div>

        <ul className="btn-group">

          <li><button className="btn btn-show-checked-only" onClick={ this._onChange.bind(this, { showCheckedItemsOnly: !this.state.showCheckedItemsOnly }) }>Show checked only</button></li>

          <li className="btn btn-add" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>add</li>

          <li className="btn btn-select" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>select</li>

          <li className="btn btn-use" onClick={ this._onChange.bind(this, { mode: 'read-only' }) }>use</li>

          <li className="btn btn-back" onClick={ this._onChange.bind(this, { mode: 'read-only' }) }>back</li>

        </ul>

      </div>

    );
  }
});