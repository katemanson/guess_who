import React from 'react'

const WinInfoContainer = (props) => {

  return(
    <div className=`info-container ${props.hide}`>
      <h2>{props.winnerText}</h2>
    </div>
  )
} 

export default WinInfoContainer