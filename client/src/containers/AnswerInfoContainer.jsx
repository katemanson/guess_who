import React from 'react'

const AnswerInfoContainer = (props) => {
  const className = 'info-container ' + props.hide

  return(
    <div className={className}>
      <p><strong>Answer is:</strong> {props.answer}</p>
    </div>
  )
}

export default AnswerInfoContainer