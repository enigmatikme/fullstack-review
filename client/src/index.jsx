import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { Z_ASCII } from 'zlib';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
   this.getOrRefresh = this.getOrRefresh.bind(this);
   this.search = this.search.bind(this);
  }

  getOrRefresh () {
    $.ajax({
      method: "GET", 
      url:'http://localhost:1128/repos',
      contentType: 'text/plain',
      dataType: 'text',
      success: (result) => {
        console.log('successfully posted and made a get request AND BACK IN CLIENt+++++', result);
        this.setState({
          repos: this.state.repos.push(result)
        });
      }, 
      error: (err) => {
        console.log(err);
        console.log("tried making a get request within post but FAILED");
      }
    });
  }

  search (term) {
    var that = this;
    console.log(`${term} was searched`);
    $.ajax({
      method: "POST",
      url: 'http://localhost:1128/repos',
      data: `${term}`,
      contentType: 'text/plain',
      dataType : 'text',
      success: (result) => {
        console.log("successfully posted " + result)
        // console.log(this);
        // this.getOrRefresh(term);

      },
      error: (err) => {
        console.log(err);
        console.log("error found in trying to send a post req");
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }

  componentDidMount() {
    this.getOrRefresh();
  }
}

ReactDOM.render(<App />, document.getElementById('app'));