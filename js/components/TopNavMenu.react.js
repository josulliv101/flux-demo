/** @jsx React.DOM */
window.$ = window.jQuery = require('jquery');

		var React = require('react'),

    cx = require('react/lib/cx'),

    Stores = require('../components/WatchStoresMixin'),

    ServerActionCreators  = require('../actions/ServerActionCreators'),

    SelectableItemsMixin = require('../components/SelectableItemsMixin');

require('../../node_modules/bootstrap/dist/js/bootstrap.min');


var TopNavMenu = React.createClass({

  mixins: [ Stores ],

  getStateFromStores: function() {

    return {

      user: Stores.Users.getActiveUser() || {},

      isUsersLoading: Stores.Users.isLoading()
      
    };

  },

  componentDidMount: function() {

		$(this.getDOMNode()).find('[data-toggle="tooltip"]').tooltip();

  },

  _onRoleChange: function(role) {

    ServerActionCreators.setActiveUserRole(role);

  },

  render: function() {

    return (

	    <div className={cx({
          'topnav-menu collapse navbar-collapse': true,
          'fade': true,
          'in': !this.state.isLoading,
          'role-technician': this.state.user.isTechnician,
          'role-investigator': this.state.user.isInvestigator
      })}>
				<ul className="nav navbar-nav navbar-right btn-group">
					<li className={cx({
							'technician': true,
							'active': this.state.user.role === 'technician'
						})}><a href="#" onClick={this._onRoleChange.bind(this, 'technician')}>Technician</a></li>
	        <li className={cx({
							'investigator': true,
							'active': this.state.user.role === 'investigator'
						})}><a href="#" onClick={this._onRoleChange.bind(this, 'investigator')}>Investigator</a></li>
	        <li className="divider-vertical"></li>
				  <li data-toggle="tooltip" data-placement="bottom" title="Settings"><a className="settings" href="#" data-toggle="modal" href="#myModal"><i className="fa fa-gear"></i></a></li>
				  <li><a className="power-off" href="#" data-toggle="tooltip" data-placement="bottom" title="Poweroff"><i className="fa fa-power-off"></i></a></li>
				</ul>
	    </div>

    );

  }

});

module.exports = TopNavMenu;