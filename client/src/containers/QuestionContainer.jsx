import React from 'react'

const QuestionContainer = (props) => {
  const className = 'info-container ' + props.hide

  return(
    <div className={className}>
      <h4>Choose a question:</h4>
      {props.questions.map((question, index) => {
        return <div className='question' id={index} key={index} onClick={props.onQuestionClick}>{question.text}</div>
      })}
    </div>
  )
}

export default QuestionContainer