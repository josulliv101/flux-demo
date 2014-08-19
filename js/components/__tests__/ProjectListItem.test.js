/** @jsx React.DOM */

jest.dontMock('../ProjectListItem.react.js');

describe('ProjectListItem', function() {
  it('sets name prop as text', function() {

    
    var React = require('react/addons');
    var ProjectListItem = require('../ProjectListItem.react.js');
    var TestUtils = React.addons.TestUtils;
    var handler = jest.genMockFunction();
    
    // Render a checkbox with label in the document
    var listItem = TestUtils.renderIntoDocument(
      <ProjectListItem name="My Name" clickHandler={ handler } />
    );

    // Verify that it's Off by default
    var a = TestUtils.findRenderedDOMComponentWithTag(listItem, 'a');
    expect(a.getDOMNode().textContent).toEqual('My Name');

    TestUtils.Simulate.click(a);

    expect(listItem.props.clickHandler.mock.calls.length).toBe(1);

  });

});