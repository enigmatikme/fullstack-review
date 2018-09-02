import React from 'react';
const Repo = (props) => {
  return (
    <div key={props.repo._id}> {props.repo.username} <a href={props.repo.html_url}> {props.repo.repo_name}</a> has {props.repo.stars} stars and {props.repo.forks} forks!</div>
  )
}



export default Repo; 