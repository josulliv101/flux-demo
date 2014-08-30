var $ = require('jquery'),

	url = "http://www.filltext.com/?callback=?";

module.exports = {
  
  getAllProjects: function(count) {

    return $.getJSON( '/data/json/project-list.json', {

      'rows': count || 1, 

      'name': '{firstName}',

      'delay': 1

    });
  },

  fetchAllUsers: function(count) {

    return $.getJSON( url, {

      'rows': count || 1, 

      'fname': '{firstName}',

      'lname': '{lastName}',

      'id': '{index}',

      'email': '{email}',

      'isTechnician': '{bool|true}', 

      'isInvestigator': '{bool|true}',

      'role': '["technician", "investigator"]',

      'selected': '{bool}',

      'delay': 1

    });
  }
};