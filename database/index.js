const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String, 
  repo_name: String,
  html_url: String,
  stars: Number
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
  // console.log("EDWARD BAED +++++++++++++++++++++", saveThis)
  const repo = new Repo ({username: saveThis.owner.login, repo_name: saveThis.full_name, html_url: saveThis.html_url, stars: saveThis.stargazers_count});
  repo.save(function (err, repo){
    if (err) {
      console.log("could not save");
    } else {
      console.log(repo);
    }
  }); 
}

let getFromDataBase = function(callback) {
  console.log("hits here");
  Repo.find({}, function(err, repos) {
    if (err) {
      console.log("could not get data from db");
      callback(err, null);
    }
  }).sort({stars: 1}).limit(3).exec(function(err, arrObj) { 
    if (err) {
      callback(err, null);
    } else {
      callback(null, arrObj);
    }
})};

module.exports = {
  getDataToDatabase : getDataToDatabase, 
  getFromDataBase : getFromDataBase
};