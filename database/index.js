const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String, 
  repo_name: String,
  html_url: String,
  stars: Number,
  forks: Number
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
  const repo = new Repo ({username: saveThis.owner.login, repo_name: saveThis.name, html_url: saveThis.html_url, stars: saveThis.stargazers_count, forks: saveThis.forks});
  repo.save(function (err, repo){
    if (err) {
      console.log("could not save data in database index.js");
    } else {
      // console.log("repo is", typeof repo.stars);
      // console.log("saved repos success in db index.js")
    }
  }); 
}

let getFromDataBase = function(callback) {
  console.log("hits getFrom Database function in index.js db");
  Repo.find({}, null, {sort: {stars: -1}}, function(err, arrObj) { 
    if (err) {
      callback(err, null);
    } else {
      console.log("arrObj is ############", arrObj)
      callback(null, arrObj);
    }
})};

module.exports = {
  getDataToDatabase : getDataToDatabase, 
  getFromDataBase : getFromDataBase
};