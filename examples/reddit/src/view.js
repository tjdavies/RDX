import React from 'react';
import * as states from './stateConsts';

export default function view ({ selectedReddit, status, reddits }, { refresh, selectReddit }){
  return (
    <div>
      <Picker selectedReddit={selectedReddit} selectReddit={selectReddit} options={reddits} />
      {contentStates[status.type](status, refresh)}
    </div>
  )
}

function Picker({value, selectReddit, options}){
  return <span>
    <h1>{value}</h1>
    <select onChange={e => selectReddit(e.target.value)} value={value}>
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>,
      )}
    </select>
  </span>
}

const contentStates = {
  [states.LOADING]: () => <h2>Loading...</h2>,  
  [states.ERROR]: () => <h2>Error</h2>,
  [states.LOADED]: dataLoadedState
}

function dataLoadedState(status,refresh){
  return <div>
    <p>
      <button onClick={refresh}>
        Refresh
      </button>
    </p>
    <PostList posts={status.posts} />
  </div>
}

function PostList({posts}){
  if(posts.length === 0){
    return <h2>Empty.</h2>
  } 
  return <Posts posts={posts} />
}

function Posts({posts}){
  return <ul>
    {posts.map((post, i) => <li key={i}>{post.title}</li>)}
  </ul>
}
