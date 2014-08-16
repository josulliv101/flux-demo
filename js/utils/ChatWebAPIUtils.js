var $ = require('jquery');

module.exports = {

  getAllProjects: function(count) {

    var url = "http://www.filltext.com/?callback=?";

    return $.getJSON( url, {

      'rows': count || 0, //Math.floor(Math.random() * 20) + 1,

      'name': '{lorem|3}',

      'id': '{index}'

    });
  }
};