import React from 'react';
const Repo = (props) => {
  return (
    <div key={props.repo._id}> {props.repo.username} <a href={props.repo.repo_url}> this is the name of the repo</a></div>
  )
}



export default Repo; 