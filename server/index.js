const express = require('express');
const bodyParser = require('body-parser');
const getRepo = require('../helpers/github.js')
const getDataToDatabase = require('../database/index.js')
const gDFDB = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log("Req is --- " , req.body);
  // console.log("res is ==== ", res.body);
  getRepo.getReposByUsername(req.body, function(err, result) {
    if (err) {
      console.log("callback fun threw error")
      res.send(err);
    } else {
      // this call back must use the results to send to mongo database
      // console.log("got results back from callback repousername")
      console.log("result are ---------", result[0])
      getDataToDatabase.getDataToDatabase(result[0]);
      res.send(console.log(result[0]));
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  gDFDB.getFromDataBase(req.body, function(err, result) {
    if (err) {
      console.log("couldn't get error from database, this console is in server");
    } else {
      console.log("GOT DATABACK AND NOW IN SERVER PLZZZZ");
      res.send(result[0]);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

