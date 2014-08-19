/** @jsx React.DOM */

jest
  .dontMock('../MultiSelectBox.react.js')
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

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithClass(view, 'message');
    expect(label.getDOMNode().textContent).toEqual('Unsaved...');

    var handlerBtnAdd = jest.genMockFunction();

    // Simulate a click and verify that it is now On
    var btnAdd = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-add');
    var btnSelect = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-select');
    var btnUse = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-use');
    var btnBack = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-back');
    
    TestUtils.Simulate.click(btnAdd);
    expect( $(view.getDOMNode()).hasClass('edit') ).toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('read-only') ).not.toBeTruthy();

    TestUtils.Simulate.click(btnBack);
    expect( $(view.getDOMNode()).hasClass('read-only') ).toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit') ).not.toBeTruthy();

    TestUtils.Simulate.click(btnSelect);
    expect( $(view.getDOMNode()).hasClass('read-only') ).not.toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit') ).toBeTruthy();

    TestUtils.Simulate.click(btnUse);
    expect( $(view.getDOMNode()).hasClass('read-only') ).toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit') ).not.toBeTruthy();


  });

});


describe('MultiSelectBox', function() {

  it('starts in read-only mode', function () {

    var React = require('react/addons');
    var $ = require('jquery');
    var MultiSelectBox = require('../MultiSelectBox.react.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox labelOn="On" labelOff="Off" />
    );

    expect( $(view.getDOMNode()).hasClass('read-only') ).toBeTruthy();

  });

  it('starts in read-only mode', function () {

    var React = require('react/addons');
    var $ = require('jquery');
    var MultiSelectBox = require('../MultiSelectBox.react.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox />
    );

    expect( $(view.getDOMNode()).hasClass('dirty') ).not.toBeTruthy();

    view.setState({ isDirty: true });

    expect( $(view.getDOMNode()).hasClass('dirty') ).toBeTruthy();

  });

  it('creates a table row for each item & flags any selected with css classname', function () {

    var React = require('react/addons');
    var $ = require('jquery');
    var MultiSelectBox = require('../MultiSelectBox.react.js');
    var TestUtils = React.addons.TestUtils,

        data = [{ name: "Joe", selected: true }, { name: "Maggie" }, { name: "Joseph" }];

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox items={data} />
    );

    expect( $(view.getDOMNode()).find('table tr').length ).toBe(3);

    expect( $(view.getDOMNode()).find('table tr.selected').length ).toBe(1);
    

  });

  it('tallies up selected items and sets state before mounting & updates DOM element', function () {

    var React = require('react/addons');
    var $ = require('jquery');
    var MultiSelectBox = require('../MultiSelectBox.react.js');
    var TestUtils = React.addons.TestUtils,

        data = [{ name: "Joe", selected: true }, { name: "Maggie" }, { name: "Joseph" }];

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox items={data} />
    );

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(1);
    
  });

});

