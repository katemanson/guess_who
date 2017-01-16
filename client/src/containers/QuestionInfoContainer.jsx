import React from 'react'

const QuestionInfoContainer = (props) => {
  const className = 'info-container ' + props.hide

  return(
    <div className={className}>
      <p><strong>Question is:</strong> {props.question.text}</p>
    </div>
  )
}

export default QuestionInfoContainer