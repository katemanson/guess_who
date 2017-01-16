import React from 'react'

const AnswerInfoContainer = (props) => {

  return(
    <div className=`info-container ${props.hide}`>
      <p><strong>Answer is:</strong> {props.answer}</p>
    </div>
  )
}

export default AnswerInfoContainer