const express = require('express');
const bodyParser = require('body-parser');
const getRepo = require('../helpers/github.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log("Req is --- " , req.body);
  console.log("res is ==== ", res.body);
  getRepo.getReposByUsername(req.body, function(err, result) {
    if (err) {
      console.log("callback fun threw error")
    } else {
      console.log("got results back from callback repousername")
      res.send(console.log(result));
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

