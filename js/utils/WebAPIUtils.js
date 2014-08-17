var $ = require('jquery'),

	url = "http://www.filltext.com/?callback=?";

module.exports = {
  
  

  getAllProjects: function(count) {

    return $.getJSON( url, {

      'rows': count || 0, //Math.floor(Math.random() * 20) + 1,

      'name': '{lorem|3}',

      'id': '{index}',

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

      'delay': 1

    });
  }
};