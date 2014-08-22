var _ = require('underscore');

var FilterItemsMixin = {

  filterItems: function(items, q, attrs) {

    attrs || (attrs = []);

    var results = _.chain(items)

                   .filter(function(item) {

                        var full = _.map(attrs, function(attr) { return item[attr] ; }).join(" ");

                        return full.match(new RegExp("\\b" + q + "[^\\b]*?\\b", "gi"));

                     }, this)

                   .value();

    return results;

  }

};

module.exports = FilterItemsMixin;