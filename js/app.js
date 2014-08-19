/**
 * @jsx React.DOM
 */

// This file bootstraps the entire application.

var App = require('./components/App.react'),
	React = require('react');

React.renderComponent(
    <App />,
    document.getElementById('task-tab')
);