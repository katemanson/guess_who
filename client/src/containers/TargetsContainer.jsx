import React from 'react'
import Person from '../components/Person.jsx'

const TargetsContainer = (props) => {
  //TODO: Haven't managed to set appClass, playerClass as classNames using es6 literals; also classNames (as set) get a warning in the console
  const appClass = "target app " + props.playerTurn
  const playerClass = "target player " + props.playerTurn
  const singularOrPlural = (peopleInPlay) => {
    if ( peopleInPlay === 1 ){
      return "y"
    } else {
      return "ies"
    }
  }

  return (
    <div className="targets-container" playerTurn={props.playerTurn}>
      <div className={appClass}>
        <h4>Your opponent's turn</h4>
        <Person
          id={props.appTarget.id} 
          characteristics={props.appTarget.characteristics}
          inPlay={false}
          hidden={false}
        />
        <h5>They have {props.appPeopleInPlay} possibilit{singularOrPlural(props.appPeopleInPlay)} left</h5>
      </div>

      <div className={playerClass}>
        <h4>Your turn</h4>
        <Person
          id={props.playerTarget.id} 
          characteristics={props.playerTarget.characteristics}
          inPlay={false}
          hidden={true}
        />
        <h5>You have {props.playerPeopleInPlay} possibilit{singularOrPlural(props.playerPeopleInPlay)} left</h5>
      </div>
    </div>
  )
}

export default TargetsContainer