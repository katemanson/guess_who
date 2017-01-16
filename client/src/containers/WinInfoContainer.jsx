import React from 'react'

const WinInfoContainer = (props) => {
  const className = 'info-container ' + props.hide

  return(
    <div className={className}>
      <h2>{props.winnerText}</h2>
    </div>
  )
} 

export default WinInfoContainer