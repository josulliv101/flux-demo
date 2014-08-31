/** @jsx React.DOM */
var App, React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var ActiveState = Router.ActiveState;

var Tab = React.createClass({

  mixins: [ ActiveState ],

  getInitialState: function () {
    return { isActive: false };
  },

  updateActiveState: function () {
    this.setState({
      isActive: Tab.isActive(this.props.to, this.props.params, this.props.query)
    })
  },

  render: function() {
    var className = this.state.isActive ? 'active' : '';
    var link = Link(this.props);
    return <li className={className}>{link}</li>;
  }

});
App = React.createClass({

  render: function() {

    return (

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-pills nav-stacked">
              <Tab to="dashboard">Dashboard</Tab>
              <Tab to="workbench">Workbench</Tab>
              <Tab to="reports">Reports</Tab>
              <Tab to="settings">Settings</Tab>
            </ul>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Dashboard</h1>
            <h2 className="sub-header">Section title</h2>
            <div>
              <p className="text-info">Hello World : <Link to="workbench">test</Link></p>
              <div className="main">
                {this.props.activeRouteHandler()}
              </div>
            </div>
          </div>
        </div>
      </div>

    );

  }

});

module.exports = App;
