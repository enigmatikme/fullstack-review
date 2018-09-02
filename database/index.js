const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String, 
  repo_url: String,
  updated_at: String
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected")
});
let Repo = mongoose.model('Repo', repoSchema);

let getDataToDatabase = function(saveThis) {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // console.log("SAVE THIS HAS ARRIVED ==============", saveThis)
  const repo = new Repo ({username: saveThis.owner.login, repo_url: saveThis.owner.repos_url, updated_at: saveThis.updated_at});
  repo.save(function (err, repo){
    if (err) {
      console.log("could not save");
    } else {
      console.log(repo);
    }
  }); 
}

let getFromDataBase = function(username, callback) {
  Repo.find({username: username}, function(err, repos) {
    if (err) {
      console.log("could not get data from db");
      callback(err, null);
    } else {
      console.log("got the data from database --------", repos);
      callback(null, repos);
    }
  });
}

module.exports.getDataToDatabase = getDataToDatabase;
module.exports.gDFDB = getFromDataBase;