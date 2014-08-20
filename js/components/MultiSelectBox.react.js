/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx'),

    _ = require('underscore');

function getStateFromStores() {

  return {

    items: [{ id: 1, name: 'Joe', selected: true }, { id: 2, name: 'Magg' }, { id: 3, name: 'Joseph' }]

  };

}

module.exports = React.createClass({

  getInitialState: function() {

    var state = getStateFromStores();

    return _.extend({ 

      isChecked: false,

      isDirty: false,

      showCheckedItemsOnly: false,

      isFilterActive: false,

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

  render: function() {

    var items = (this.state.items).map(function(item, i) {

        var isSelected = this.isItemIdSelected(item.id);

        return ( <li className={cx({ selected: isSelected })} onClick={this.handleItemClick.bind(this, item.id)} ><td>test {i}</td></li> );

      }, this),

      handler = this._onChange, 

      modeEdit = { mode: 'edit' }, 

      modeReadOnly = { mode: 'read-only' };

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

        <label className="selected"><em>{this.state.selectedIds.length}</em> selected</label>

        <label className="filter-remove"><span>x</span>Clear Filter</label>

        <ul className="tbl-div">{items}</ul>

        <div className="tbl-message">No items are currently checked. <label>View all items</label>.</div>

        <ul class="display-options">

          <li>Show checked only</li>

        </ul>

        <ul className="btn-group">

          <li className="btn btn-add" onClick={ handler.bind(this, modeEdit) }>add</li>

          <li className="btn btn-select" onClick={ handler.bind(this, modeEdit) }>select</li>

          <li className="btn btn-use" onClick={ handler.bind(this, modeReadOnly) }>use</li>

          <li className="btn btn-back" onClick={ handler.bind(this, modeReadOnly) }>back</li>

        </ul>

      </div>

    );

  },

  //// 'Private' ////

  _onChange: function(stateAttrs) {

    this.setState( _.extend(getStateFromStores(), stateAttrs) );

  }

});