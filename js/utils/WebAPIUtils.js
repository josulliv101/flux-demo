var $ = require('jquery'),

	url = "http://www.filltext.com/?callback=?";

module.exports = {
  
  

  getAllProjects: function(count) {

      var params = {};
      params.dataType = 'json';
      params.contentType = 'application/json';
      params.type = 'POST';
      params.data = "";
      params.url = '/site/query?action=getProjectSummaries';
      params.headers = {'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImtleTIifQ.eyJpc3MiOiJrbm9tZS5jb20iLCJpYXQiOjE0MDgzOTg2NzJ9.VDn_dPJLietQUYT5vr6xOl7qQkldWYciowj-7skuJr0' };

    return $.ajax(params);
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