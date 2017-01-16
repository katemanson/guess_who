import React from 'react'

const Person = (props) => {
  //? Haven't managed to get titleText to work as an es6 template literal 
  if (props.inPlay) {
    const titleText = "Click to guess it's " + props.characteristics.name
    return(
      <div className="person in-play" title={titleText} id={props.id} onClick={props.onClick}>
        <p>{props.characteristics.gender}</p>
        <p>{props.characteristics.name}</p>
      </div>
    )
  }
  if (!props.hidden) {
    return(
      <div className="person out-of-play" id={props.id}>
        <p>{props.characteristics.name}</p>
      </div>
    )
  }
  if (props.hidden) {
    return(
      <div className="person hidden" id={props.id}>
        <p>?</p>
      </div>
    )
  }
}

export default Person