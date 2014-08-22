/** @jsx React.DOM */

jest.dontMock('../FilterItemsMixin.js')

    .dontMock('underscore');

describe('FilterItems Mixin', function() {

  var items, mixins;

  beforeEach(function() {

    mixins = require('../FilterItemsMixin.js');

    items = [{ id: 1, name: 'Joe', lname: 'Sullivan', selected: true }, { id: 2, name: 'Sarah', lname: 'Fox' }, { id: 3, name: 'Joseph', lname: 'Sullivan' }];

  });

  it('filters items against passed-in attr', function() {

    var filtered = mixins.filterItems(items, 'J', ['name']);

    expect( filtered.length ).toBe(2);

    filtered = mixins.filterItems(items, 'S', ['lname']);

    expect( filtered.length ).toBe(2);

    filtered = mixins.filterItems(items, 'J', ['lname']);

    expect( filtered.length ).toBe(0);

  });

  it('filters items against passed-in attrs (multiple) & case insensitive', function() {

    var filtered = mixins.filterItems(items, 'j', [ 'name', 'lname' ]);

    expect( filtered.length ).toBe(2);

    filtered = mixins.filterItems(items, 'z', [ 'name', 'lname' ]);

    expect( filtered.length ).toBe(0);

    filtered = mixins.filterItems(items, 's', [ 'name', 'lname' ]);

    expect( filtered.length ).toBe(3);

  });

  it('handles filtering with spaces in search term', function () {

    var filtered = mixins.filterItems(items, 'Joe', [ 'name', 'lname' ]);

    expect( filtered.length ).toBe(1);

    filtered = mixins.filterItems(items, 'Joe S', [ 'name', 'lname' ]);

    expect( filtered.length ).toBe(1);

  });

});

