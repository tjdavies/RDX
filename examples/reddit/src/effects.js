export function loadReddit (s, actions) {
  return fetch(`https://www.reddit.com/r/${s.selectedReddit}.json`)
    .then(response => response.json())
    .then(json => json.data.children.map(child => child.data))
    .then(actions.recivedPosts, actions.recivedError);  
}
