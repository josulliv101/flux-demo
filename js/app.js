/** @jsx React.DOM */
var App = require('./components/App2.react'),
	React = require('react');

var Router = require('../node_modules/react-router/index');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;

var Home = React.createClass({
  render: function() {
    return <h1>I am Dashboard</h1>;
  }
});

var Workbench = React.createClass({
  render: function() {
    return <h1>I am Workbench</h1>;
  }
});

var Reports = React.createClass({
  render: function() {
    return <h1>I am Reports</h1>;
  }
});

var Settings = React.createClass({
  render: function() {
    return <h1>I am Settings</h1>;
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="dashboard" handler={Home}/>
    <Route name="workbench" path="workbench" handler={Workbench}/>
    <Route name="reports" path="reports" handler={Reports}/>
    <Route name="settings" path="settings" handler={Settings}/>
  </Route>
);

React.renderComponent(
  <Routes children={routes}/>,
  document.getElementById('app')
);