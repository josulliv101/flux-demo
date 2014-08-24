/** @jsx React.DOM */
var React = require('react/addons'),

    cx = require('react/lib/cx'),

    _ = require('underscore'),

    SelectableItemsMixin = require('../components/SelectableItemsMixin'),

    FilterItemsMixin = require('../components/FilterItemsMixin');

function _filterItems(items, q, context) {

  if (_.isEmpty(q)) return items;

  return _.filter(items, function(item) { return (context.props.formatItemLabel(item)).indexOf(q) === 0; }, this);

}

module.exports = React.createClass({

  mixins: [ React.addons.LinkedStateMixin, SelectableItemsMixin, FilterItemsMixin ],

  getInitialState: function() {

    var mockItems = [{ id: 1, name: 'Joe', lname: 'Sullivan', selected: true }, { id: 2, name: 'Magg', lname: 'Sullivan' }, { id: 3, name: 'Joseph', lname: 'Sullivan' }];

    return { 

      isDirty: false,

      showCheckedItemsOnly: false,

      filterText: '',

      mode: this.props.initialMode || 'read-only',

      selectedIds: this.getSelected(this.props.initialItems || mockItems),

      items: this.props.initialItems || mockItems

    };
  },

  _onChange: function(stateAttrs, cb) {

    this.setState(stateAttrs);

    if (_.isFunction(cb)) cb();

  },

  render: function() {

    var list = this.state.mode === 'edit' ? _filterItems( this.state.items, this.state.filterText, this) : this.getSelectedIdsAsObjects(this.state.selectedIds);


        var items = list.map(function(item, i) {

        return ( <a key={item.id} className={cx({ "list-group-item": true, active: this.isItemIdSelected(item.id) })} href="#" onClick={this.state.mode === 'edit' ? this.toggleItem.bind(this, item.id) : ''} >{this.props.formatItemLabel && this.props.formatItemLabel(item) || item.name}<span className={"glyphicon glyphicon-" + (this.isItemIdSelected(item.id) ? "check" : "unchecked") + " pull-right"}></span></a> );

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
        <header>
          <label className="selected text-right text-muted pull-right"> <small><em>{this.state.selectedIds.length}</em> selected</small></label>
          <button className="btn btn-default btn-sm filter-clear pull-right" onClick={ this._onChange.bind(this, { filterText: '' }) }>Clear Filter</button>
          <div className="filter">
            <input className="form-control txtbox-filter" type="text" placeholder="filter by name" valueLink={this.linkState('filterText')} />
          </div>
          <label className="message text-muted"><small>Unsaved...</small></label>
        </header>
        <ul className="tbl-div list-group">{items}</ul>
        <div className="tbl-message">No items are currently checked. <label>View all items</label>.</div>
        <button className="btn btn-show-checked-only" onClick={ this._onChange.bind(this, { showCheckedItemsOnly: !this.state.showCheckedItemsOnly }) }>Show checked only</button>
        <div className="pull-right">
          <button type="button" className="btn btn-primary btn-add" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>add</button>
          <button type="button" className="btn btn-primary btn-select" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>select</button>
          <button type="button" className="btn btn-primary btn-use" onClick={ this._onChange.bind(this, { mode: 'edit-read-only', filterText: '' }, this.updateCachedSelectedIds )}>use</button>
          <button type="button" className="btn btn-primary btn-back" onClick={ this._onChange.bind(this, { mode: 'edit-read-only', filterText: '', selectedIds: this.origSelectedIds }) }>back</button>
        </div>
      </div>
    );
  }
});