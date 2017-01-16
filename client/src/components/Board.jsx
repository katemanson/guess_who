import React from 'react'
import Person from './Person.jsx'

const Board = (props) => {

  return(
    <div className="gameboard">
      {props.people.map((person, index) => {
        return (<Person
          key={index}
          id={index}
          characteristics={person.characteristics}
          inPlay={person.inPlay}
          onClick={props.onPersonClick}
        />)
      })}
    </div>
  )
}

export default Board