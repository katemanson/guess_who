import React from 'react'
import Person from '../components/Person.jsx'

const TargetsContainer = (props) => {
  const appClass = `target app ${props.playerTurn}`
  const playerClass = `target player ${props.playerTurn}`

  const singularOrPlural = (peopleInPlay) => {
    if ( peopleInPlay === 1 ){
      return "y"
    } else {
      return "ies"
    }
  }

  const hidden = (peopleInPlay) => {
    if ( peopleInPlay <= 1 ){
      return false
    } else {
      return true
    }
  }

  return (
    <div className="targets-container">
      <div className={appClass}>
        <h4>Your opponent's turn</h4>
        <Person
          id={props.appTarget.id} 
          characteristics={props.appTarget.characteristics}
          inPlay={false}
          hidden={false}
          playerTurn=props.playerTurn
        />
        <h5>They have {props.appPeopleInPlay} possibilit{singularOrPlural(props.appPeopleInPlay)} left</h5>
      </div>

      <div className={playerClass}>
        <h4>Your turn</h4>
        <Person
          id={props.playerTarget.id} 
          characteristics={props.playerTarget.characteristics}
          inPlay={false}
          hidden={hidden(props.playerPeopleInPlay)}
          playerTurn=props.playerTurn
        />
        <h5>You have {props.playerPeopleInPlay} possibilit{singularOrPlural(props.playerPeopleInPlay)} left</h5>
      </div>
    </div>
  )
}

export default TargetsContainer