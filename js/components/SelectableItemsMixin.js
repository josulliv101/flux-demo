/** @jsx React.DOM */
var React = require('react'),

    cx = require('react/lib/cx'),

    _ = require('underscore');

var SelectableItemsMixin = {

  intervals: [],

  componentWillMount: function() {

    // Save originally selected ids for isDirty comparison
    if (!this.origSelectedIds) this.origSelectedIds = this.state.selectedIds;

  },

  getSelected: function(items) { // Set options.ids = true to get ids back

    options = (options = {});

    return _.chain(items)

            .filter(function(item) { return item.selected === true; })

            .map(function(item) { return item.id; })

            .value();

  },

  isItemIdSelected: function(id) {

    return _.contains(this.state.selectedIds, id);

  },

  toggleItem: function(id) {

    var fn = !this.isItemIdSelected(id) ? _.union : _.difference,

        // Add or remove the item based on its presence in array
        ids = fn(this.state.selectedIds, [ id ]);

    this.setState({ selectedIds: ids });

  }

};

module.exports = SelectableItemsMixin;