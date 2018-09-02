import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => {
  console.log(props)
  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos. 
    <div>
      {props.repos.length !== 0 ? 
      props.repos.map(repo => {
        return (
         <Repo repo={repo}/>
        )
      })
      : null
      }
    </div>
  </div>
)}

export default RepoList;