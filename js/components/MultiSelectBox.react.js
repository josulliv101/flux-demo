/** @jsx React.DOM */
var React = require('react/addons'),

    cx = require('react/lib/cx'),

    _ = require('underscore'),

    SelectableItemsMixin = require('../components/SelectableItemsMixin'),

    FilterItemsMixin = require('../components/FilterItemsMixin');

function _filterItems(items, q) {

  if (_.isEmpty(q)) return items;

  return _.filter(items, function(item) { return item.name.indexOf(q) === 0; });

}

module.exports = React.createClass({

  mixins: [ React.addons.LinkedStateMixin, SelectableItemsMixin, FilterItemsMixin ],

  getInitialState: function() {

    var items = [{ id: 1, name: 'Joe', lname: 'Sullivan', selected: true }, { id: 2, name: 'Magg', lname: 'Sullivan' }, { id: 3, name: 'Joseph', lname: 'Sullivan' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }, { id: 99, name: '999', lname: '888' }];

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

        return ( <a className={cx({ "list-group-item": true, active: this.isItemIdSelected(item.id) })} href="#" onClick={this.toggleItem.bind(this, item.id)} >{item.name} {item.lname}</a> );

      }, this);

    return (
      <div className={cx({
          'multi-selectbox bd item-orange clearfix': true,
          'read-only': this.state.mode === 'read-only',
          'edit-read-only': this.state.mode === 'edit-read-only',
          'edit': this.state.mode === 'edit',
          'dirty': !_.isEqual(this.origSelectedIds, this.state.selectedIds),
          'filter-active': !_.isEmpty(this.state.filterText),
          'show-checkbox-only': this.state.showCheckedItemsOnly,
          'has-results': items.length > 0
      })}>
        <div className="filter">
          <input className="txtbox-filter" type="text" placeholder="filter by name" valueLink={this.linkState('filterText')} />
          <label>x</label>
        </div>
        <label className="message text-info">Unsaved...</label>
        <label className="selected text-right text-info"><em>{this.state.selectedIds.length}</em> selected</label>
        <label className="filter-clear"><span>x</span>Clear Filter</label>
        <ul className="tbl-div list-group">{items}</ul>
        <div className="tbl-message">No items are currently checked. <label>View all items</label>.</div>
        <ul className="btn-group">
          <li><button className="btn btn-show-checked-only" onClick={ this._onChange.bind(this, { showCheckedItemsOnly: !this.state.showCheckedItemsOnly }) }>Show checked only</button></li>
          <button type="button" className="btn btn-primary btn-sm btn-add" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>add</button>
          <button type="button" className="btn btn-primary btn-sm btn-select" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>select</button>
          <button type="button" className="btn btn-primary btn-sm btn-use" onClick={ this._onChange.bind(this, { mode: 'edit-read-only' }) }>use</button>
          <button type="button" className="btn btn-primary btn-sm btn-back" onClick={ this._onChange.bind(this, { mode: 'edit-read-only' }) }>back</button>
        </ul>
      </div>
    );
  }
});