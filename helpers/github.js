const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, function(err, res) {
    if (err) {
      callback(err, null);
    } else {
      let json = JSON.parse(res.body);
      console.log("JSON IS +++++++++++++++", res.body);
      callback(null, json);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;