import React from 'react'
import ReactDOM from 'react-dom'
import GameContainer from './containers/GameContainer.jsx'

window.onload = () => {
  ReactDOM.render(
    <GameContainer />,
    document.getElementById('app')
  )
}