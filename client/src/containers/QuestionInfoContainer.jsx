import React from 'react'

const QuestionInfoContainer = (props) => {

  return(
    <div className=`info-container ${props.hide}`>
      <p><strong>Question is:</strong> {props.question.text}</p>
    </div>
  )
}

export default QuestionInfoContainer