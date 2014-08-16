/**
 * @jsx React.DOM
 */

// This file bootstraps the entire application.

var ChatApp = require('./components/ChatApp.react');
var React = require('react');

React.renderComponent(
    <ChatApp />,
    document.getElementById('react')
);

