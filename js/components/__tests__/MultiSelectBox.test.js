/** @jsx React.DOM */

jest
  .dontMock('../MultiSelectBox.react.js')
  .dontMock('../SelectableItemsMixin.js')
  .dontMock('jquery')
  .dontMock('underscore');

describe('MultiSelectBox', function() {

  var React, $, MultiSelectBox, TestUtils;

  var React = require('react/addons');
  var $ = require('jquery');
  var MultiSelectBox = require('../MultiSelectBox.react.js');
  var TestUtils = React.addons.TestUtils;

  var mockItems = [{ id: 1, name: 'Joe', lname: 'Sullivan', selected: true }, { id: 2, name: 'Magg', lname: 'Sullivan' }, { id: 3, name: 'Joseph', lname: 'Sullivan' }];

  it('changes the text after click', function() {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialItems={mockItems} />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithClass(view, 'message');
    expect(label.getDOMNode().textContent).toEqual('Unsaved...');

    expect( $(view.getDOMNode()).hasClass('read-only') ).toBeTruthy();

    // Simulate a click and verify that it is now On
    var btnAdd = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-add');
    var btnSelect = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-select');
    var btnUse = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-use');
    var btnBack = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-back');
    
    TestUtils.Simulate.click(btnAdd);
    expect( $(view.getDOMNode()).hasClass('edit') ).toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit-read-only') ).not.toBeTruthy();

    TestUtils.Simulate.click(btnBack);
    expect( $(view.getDOMNode()).hasClass('edit-read-only') ).toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit') ).not.toBeTruthy();

    TestUtils.Simulate.click(btnSelect);
    expect( $(view.getDOMNode()).hasClass('edit-read-only') ).not.toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit') ).toBeTruthy();

    TestUtils.Simulate.click(btnUse);
    expect( $(view.getDOMNode()).hasClass('edit-read-only') ).toBeTruthy();
    expect( $(view.getDOMNode()).hasClass('edit') ).not.toBeTruthy();

  });

  it('starts in read-only mode', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialItems={mockItems}/>
    );

    expect( $(view.getDOMNode()).hasClass('read-only') ).toBeTruthy();

  });

  it('reflects isDirty state', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialMode="edit" initialItems={mockItems} />
    );
    var btnSelect = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-select');
    TestUtils.Simulate.click(btnSelect);

    var tbl = TestUtils.findRenderedDOMComponentWithClass(view, 'tbl-div');
    var TRs = TestUtils.scryRenderedDOMComponentsWithTag(tbl, 'a');

    expect( $(view.getDOMNode()).hasClass('dirty') ).not.toBeTruthy();

    TestUtils.Simulate.click(TRs[0]);

    expect( $(view.getDOMNode()).hasClass('dirty') ).toBeTruthy();

    TestUtils.Simulate.click(TRs[0]);

    expect( $(view.getDOMNode()).hasClass('dirty') ).not.toBeTruthy();

    TestUtils.Simulate.click(TRs[0]);

    TestUtils.Simulate.click(TRs[1]);

    expect( $(view.getDOMNode()).hasClass('dirty') ).toBeTruthy();

  });

  it('creates a table row for each item & flags any selected with css classname', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialMode="edit" initialItems={mockItems} />
    );

    var btnSelect = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-select');
    TestUtils.Simulate.click(btnSelect);

    expect( $(view.getDOMNode()).find('.tbl-div a').length ).toBe(3);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(1);
    

  });

  it('reflects the \'show checked only\' state in dom as css flag', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialItems={mockItems} />
    );

    var btnShowCheckedOnly = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-show-checked-only');

    expect( $(view.getDOMNode()).hasClass('show-checkbox-only') ).toBeFalsy();

    TestUtils.Simulate.click(btnShowCheckedOnly);

    expect( $(view.getDOMNode()).hasClass('show-checkbox-only') ).toBeTruthy();

    TestUtils.Simulate.click(btnShowCheckedOnly);

    expect( $(view.getDOMNode()).hasClass('show-checkbox-only') ).toBeFalsy();

    TestUtils.Simulate.click(btnShowCheckedOnly);

    TestUtils.Simulate.click(btnShowCheckedOnly);

    expect( $(view.getDOMNode()).hasClass('show-checkbox-only') ).toBeFalsy();
    
  });

  it('handles selection of items via tr clicking', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialMode="edit" initialItems={mockItems} />
    );

    var btnSelect = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-select');
    TestUtils.Simulate.click(btnSelect);

    var tbl = TestUtils.findRenderedDOMComponentWithClass(view, 'tbl-div');
    var TRs = TestUtils.scryRenderedDOMComponentsWithTag(tbl, 'a');

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(1);

    TestUtils.Simulate.click(TRs[0]);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(0);

    TestUtils.Simulate.click(TRs[0]);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(1);


    TestUtils.Simulate.click(TRs[1]);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(2);


    TestUtils.Simulate.click(TRs[2]);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(3);


    TestUtils.Simulate.click(TRs[1]);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(2);

    TestUtils.Simulate.click(TRs[0]);

    expect( parseInt($(view.getDOMNode()).find('.selected em').html()) ).toBe(1);

  });

  it('reflects the \'filter input query\' state in dom as css flag', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialItems={mockItems} />
    );

    var txtboxFilter = TestUtils.findRenderedDOMComponentWithClass(view, 'txtbox-filter');

    expect( $(view.getDOMNode()).hasClass('filter-active') ).not.toBeTruthy();

    $(txtboxFilter.getDOMNode()).val('test');

    TestUtils.Simulate.change(txtboxFilter);

    expect( $(view.getDOMNode()).hasClass('filter-active') ).toBeTruthy();
    
  });

  it('filters items based on filter text', function () {

    // Render a checkbox with label in the document
    var view = TestUtils.renderIntoDocument(
      <MultiSelectBox initialMode="edit" initialItems={mockItems} />
    );

    var btnSelect = TestUtils.findRenderedDOMComponentWithClass(view, 'btn-select');
    TestUtils.Simulate.click(btnSelect);

    var txtboxFilter = TestUtils.findRenderedDOMComponentWithClass(view, 'txtbox-filter');

    expect( $(view.getDOMNode()).hasClass('filter-active') ).not.toBeTruthy();

    $(txtboxFilter.getDOMNode()).val('J');

    TestUtils.Simulate.change(txtboxFilter);

    expect( $(view.getDOMNode()).hasClass('filter-active') ).toBeTruthy();

    expect( $(view.getDOMNode()).find('.tbl-div a').length ).toBe(2);

    $(txtboxFilter.getDOMNode()).val('M');

    TestUtils.Simulate.change(txtboxFilter);

    expect( $(view.getDOMNode()).hasClass('filter-active') ).toBeTruthy();

    expect( $(view.getDOMNode()).find('.tbl-div a').length ).toBe(1);
 
  });

});