/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx'),

    _ = require('underscore');

function getStateFromStores() {

  return {

    items: [{ id: 1, name: 'Joe', lname: 'Sullivan', selected: true }, { id: 2, name: 'Magg', lname: 'Sullivan' }, { id: 3, name: 'Joseph', lname: 'Sullivan' }]

  };

}

function _filterItems(items, q) {

  if (_.isEmpty(q)) return items;

  return _.filter(items, function(item) { return item.name.indexOf(q) === 0; });

}

module.exports = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {

    var state = getStateFromStores();

    return _.extend({ 

      isDirty: false,

      showCheckedItemsOnly: false,

      filterText: '',

      mode: 'read-only',

      selectedIds: _.chain(state.items)

                    .filter(function(item) { return item.selected === true; })

                    .map(function(item) { return item.id; })

                    .value()

    }, state );

  },

  isItemIdSelected: function(id) {

    return _.contains(this.state.selectedIds, id);

  },

  handleItemClick: function(id) {

    var fn = !this.isItemIdSelected(id) ? _.union : _.difference,

        // Add or remove the item based on its presence in array
        ids = fn(this.state.selectedIds, [ id ]);

    this.setState({ selectedIds: ids });

  },

  _onChange: function(stateAttrs) {

    this.setState( _.extend(getStateFromStores(), stateAttrs) );

  },

  render: function() {

    var items = ( _filterItems(this.state.items, this.state.filterText) ).map(function(item, i) {

        var isSelected = this.isItemIdSelected(item.id);

        return ( <li className={cx({ selected: isSelected })} onClick={this.handleItemClick.bind(this, item.id)} ><td>test {i}</td></li> );

      }, this),

      handler = this._onChange, 

      modeEdit = { mode: 'edit' }, 

      modeReadOnly = { mode: 'read-only' };

      // Save originally selected ids for isDirty comparison
      if (!this.origSelectedIds) this.origSelectedIds = this.state.selectedIds;

    return (

      <div className={cx({

          'bd item-orange clearfix': true,

          'read-only': this.state.mode === 'read-only',

          'edit-read-only': this.state.mode === 'edit-read-only',

          'edit': this.state.mode === 'edit',

          'dirty': !_.isEqual(this.origSelectedIds, this.state.selectedIds),//this.state.isDirty,

          'filter-active': !_.isEmpty(this.state.filterText),

          'show-checkbox-only': this.state.showCheckedItemsOnly

      })}>

        <div className="header">

          <div className="filter">

            <input className="txtbox-filter" type="text" placeholder="filter by name" valueLink={this.linkState('filterText')} />

            <label>x</label>

          </div>

        </div>

        <label className="message">Unsaved...</label>

        <label className="selected"><em>{this.state.selectedIds.length}</em> selected</label>

        <label className="filter-remove"><span>x</span>Clear Filter</label>

        <ul className="tbl-div">{items}</ul>

        <div className="tbl-message">No items are currently checked. <label>View all items</label>.</div>

        <ul className="btn-group">

          <li><button className="btn btn-show-checked-only" onClick={ handler.bind(this, { showCheckedItemsOnly: !this.state.showCheckedItemsOnly }) }>Show checked only</button></li>

          <li className="btn btn-add" onClick={ handler.bind(this, modeEdit) }>add</li>

          <li className="btn btn-select" onClick={ handler.bind(this, modeEdit) }>select</li>

          <li className="btn btn-use" onClick={ handler.bind(this, modeReadOnly) }>use</li>

          <li className="btn btn-back" onClick={ handler.bind(this, modeReadOnly) }>back</li>

        </ul>

      </div>

    );

  }

});