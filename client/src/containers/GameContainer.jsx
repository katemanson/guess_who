import React from 'react'
import Game, {countPeopleInPlay} from '../functions/Game.js'
import Board from '../components/Board.jsx'
import TargetsContainer from './TargetsContainer.jsx'
import QuestionContainer from './QuestionContainer.jsx'

class GameContainer extends React.Component{

  constructor(props){
    const game = new Game()
    super(props)
    this.state = {
      appPeople: game.appPeople,
      playerPeople: game.playerPeople,
      appTarget: game.appTarget,
      playerTarget: game.playerTarget,
      appPeopleInPlay: game.appPeopleInPlay,
      playerPeopleInPlay: game.playerPeopleInPlay,
      playerTurn: game.playerTurn,
      questions: game.questions
    }
    this.handlePersonClick = this.handlePersonClick.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
  }

//game won when only one person inPlay

  componentWillUpdate(nextProps, nextState){
    console.log('componentWillUpdate')
    console.log('nextState', nextState)
  }

  handlePersonClick(event){
    if ( parseInt(event.currentTarget.id) === this.state.playerTarget.id ) {
      console.log("player win!")
    } else {
      this.setState({userTurn: false})
    }
  }

  handleQuestion(event){
    const copyPlayerPeople = this.state.playerPeople.slice()
    const question = this.state.questions[event.currentTarget.id]

    //if question and target MATCH, answer 'yes' and eliminate those WITHOUT characteristic
    if ( this.state.playerTarget.characteristics[question.characteristic] === question.value ){
      copyPlayerPeople.forEach((person) => { 
        if ( person.characteristics[question.characteristic] !== question.value ){
          person.inPlay = false
        }
      })
    }
    //if question and target DO NOT MATCH, answer 'no' and eliminate those WITH characteristic
    if ( this.state.playerTarget.characteristics[question.characteristic] !== question.value ){
      copyPlayerPeople.forEach((person) => {
        if ( person.characteristics[question.characteristic] === question.value){
          person.inPlay = false
        }
      })
    }

    const newPlayerPeopleInPlay = countPeopleInPlay(copyPlayerPeople)
    this.setState({
      playerPeople: copyPlayerPeople,
      playerPeopleInPlay: newPlayerPeopleInPlay,
      playerTurn: false
    })
  }

  render(){
    return(
      <div>
        <Board 
          people={this.state.playerPeople}
          onPersonClick={this.handlePersonClick}
        />
        <TargetsContainer 
          appTarget={this.state.appTarget}
          appPeopleInPlay={this.state.appPeopleInPlay}
          playerTarget={this.state.playerTarget}
          playerPeopleInPlay={this.state.playerPeopleInPlay}
          playerTurn={this.state.playerTurn}
        />
        <QuestionContainer 
          questions={this.state.questions} 
          onQuestionClick={this.handleQuestion}
        />
      </div>
    )
  }
}

export default GameContainer