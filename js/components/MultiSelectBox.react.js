/** @jsx React.DOM */
var React = require('react/addons'),

    cx = require('react/lib/cx'),

    _ = require('underscore'),

    SelectableItemsMixin = require('../components/SelectableItemsMixin');

function _filterItems(items, q, context) {

  if (_.isEmpty(q)) return items;

  return _.filter(items, function(item) { return (context.props.formatItemLabel(item)).match(new RegExp("\\b" + q + "[^\\b]*?\\b", "gi")); }, this);

}

module.exports = React.createClass({

  mixins: [ React.addons.LinkedStateMixin, SelectableItemsMixin ],

  getDefaultProps: function() {

    return { formatItemLabel: function(item) { return item.name || item.id; }}

  },

  _onChange: function(stateAttrs, cb) {

    this.setState(stateAttrs);

    if (_.isFunction(cb)) cb();

  },

  render: function() {

    var list = this.state.mode !== 'edit' || this.state.showCheckedItemsOnly === true ? this.getSelectedIdsAsObjects(this.state.selectedIds) : _filterItems( this.state.items, this.state.filterText, this);

    var items = list.map(function(item, i) {

        return ( <a key={item.id} className={cx({ "list-group-item": true, active: this.isItemIdSelected(item.id) })} href="#" onClick={this.state.mode === 'edit' ? this.toggleItem.bind(this, item.id) : ''} >{this.props.formatItemLabel(item)}<span className={"glyphicon glyphicon-" + (this.isItemIdSelected(item.id) ? "check" : "unchecked") + " pull-right"}></span></a> );

      }, this);

    return (
      <div className={cx({
          'multi-selectbox bd item-orange clearfix': true,
          'read-only': _.isEmpty(this.state.mode) || this.state.mode === 'read-only',
          'edit-read-only': this.state.mode === 'edit-read-only',
          'edit': this.state.mode === 'edit',
          'dirty': !_.isEqual(this.origSelectedIds, this.state.selectedIds),
          'filter-active': !_.isEmpty(this.state.filterText),
          'show-checkbox-only': this.state.showCheckedItemsOnly === true,
          'no-results': items.length === 0
      })}>
        <header>
          <label className="selected text-muted pull-right"> <small><em>{this.state.selectedIds.length}</em>/{this.state.items.length} selected</small></label>
          <button className="btn btn-default btn-sm filter-clear pull-right" onClick={ this._onChange.bind(this, { filterText: '' }) }>Clear Filter</button>
          <div className="filter">
            <i className="glyphicon glyphicon-search"></i><a onClick={ this._onChange.bind(this, { filterText: '' }) } href="#"><i className="glyphicon glyphicon-remove"></i></a>
            <input className="form-control txtbox-filter" type="text" placeholder={this.props.filterPlaceholder || 'filter items' } valueLink={this.linkState('filterText')} disabled={ this.state.showCheckedItemsOnly } />
          </div>
          <label className="message text-muted"><small>Unsaved...</small></label>
        </header>
        <ul className="tbl-div list-group">{items}</ul>
        <p className="tbl-message">No results. <a href="#" onClick={ this._onChange.bind(this, { showCheckedItemsOnly: false, filterText: '' }) }>{this.state.showCheckedItemsOnly === true ? "View all items" : "Clear '" + this.state.filterText + "' search term"}</a>.</p>
        <button type="button" className="btn btn-link btn-show-checked-only" onClick={ this._onChange.bind(this, { showCheckedItemsOnly: !this.state.showCheckedItemsOnly }) } disabled={ !_.isEmpty(this.state.filterText) }><i className={"glyphicon glyphicon-" + (this.state.showCheckedItemsOnly ? "check" : "unchecked")}></i>Show checked only</button>
        <div className="pull-right">
          <button type="button" className="btn btn-lg btn-primary btn-add" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>Add</button>
          <button type="button" className="btn btn-lg btn-primary btn-select" onClick={ this._onChange.bind(this, { mode: 'edit' }) }>Select</button>
          <button type="button" className="btn btn-lg btn-primary btn-use" onClick={ this._onChange.bind(this, { mode: 'edit-read-only', filterText: '', showCheckedItemsOnly: false }, this.updateCachedSelectedIds )}>Done</button>
          <button type="button" className="btn btn-lg btn-default btn-back" onClick={ this._onChange.bind(this, { mode: 'edit-read-only', filterText: '', showCheckedItemsOnly: false, selectedIds: this.cachedSelectedIds }) }>Back</button>
        </div>
      </div>
    );
  }
});