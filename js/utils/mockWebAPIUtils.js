var $ = require('jquery'),

	url = "http://www.filltext.com/?callback=?";

module.exports = {
  
  getAllProjects: function(count) {

    return $.getJSON( url, {

      "rows": count || 1,
      "delay": 1,

      "abandonedNumSequences":0,
      "createdDate":"{date}",
      "leadInvestigatorId": "{username}",
      "leadInvestigatorNameFirst": "{firstName}",
      "leadInvestigatorNameLast": "{lastName}",
      "leadInvestigatorNameMiddle":null,
      "name": "{business}",
      "numSequences":0,
      "priorityCd":"02",
      "priorityText":"Normal",
      "projectCid":"{randomNumberLength|4}",
      "projectId": "{randomNumberLength|9}",
      "rdcId":2,
      "situationCd":"ACS",
      "situationCdText":"Add call set?",
      "statusCd": '["type1", "type2"]',
      "statusText":"Preparing Call Sets",
      "updatedDate": "{date}"
      
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