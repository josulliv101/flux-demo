/** @jsx React.DOM */

jest
  .dontMock('../MultiSelectBox.react.js')
  .dontMock('../SelectableItemsMixin.js')
  .dontMock('jquery');

describe('MultiSelectBox', function() {
  it('changes the text after click', function() {

    var React = require('react/addons');
    var $ = require('jquery');
    var MultiSelectBox = require('../MultiSelectBox.react.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox labelOn="On" labelOff="Off" />
    );

    expect( view.origSelectedIds.length ).toBeDefined();

    expect( view.getSelected(view.state.items).length ).toBe(1);

    expect( view.isItemIdSelected(view.state.items[0].id) ).toBeTruthy();

    view.toggleItem(view.state.items[0].id);

    expect( view.isItemIdSelected(view.state.items[0].id)  ).not.toBeTruthy();

    view.toggleItem(view.state.items[0].id);

    expect( view.isItemIdSelected(view.state.items[0].id)  ).toBeTruthy();

  });

});