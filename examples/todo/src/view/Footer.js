import React from 'react';

export default function Footer({onFilterClick, activeFilter}){
  return <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL" onClick={onFilterClick} activeFilter={activeFilter} >
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE" onClick={onFilterClick} activeFilter={activeFilter} >
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED" onClick={onFilterClick} activeFilter={activeFilter} >
      Completed
    </FilterLink>
  </p>
}

function FilterLink({ activeFilter, children, onClick, filter }){
  if (activeFilter === filter) {
    return <span>{children}</span>
  }
  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick(filter)
       }}
    >
      {children}
    </a>
  )
}
