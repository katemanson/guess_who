import React from 'react'
import Game, {countPeopleInPlay, getRandomItem} from '../functions/Game.js'
import Board from '../components/Board.jsx'
import TargetsContainer from './TargetsContainer.jsx'
import QuestionContainer from './QuestionContainer.jsx'
import QuestionInfoContainer from './QuestionInfoContainer.jsx'
import AnswerInfoContainer from './AnswerInfoContainer.jsx'
import WinInfoContainer from './WinInfoContainer.jsx'

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
      questions: game.questions,
      appQuestions: game.questions,
      currentQuestion: {},
      currentAnswer: "",
      infoState: 0,
      winnerText: ""
    }
    this.handlePersonClick = this.handlePersonClick.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
  }

//game won when only one person inPlay

  componentWillUpdate(nextProps, nextState){
    console.log('componentWillUpdate')
    console.log('nextState appPeople', nextState.appPeople)
    console.log('nextState playerPeople', nextState.playerPeople)
  }

  handlePersonClick(event){
    const copyPlayerPeople = this.state.playerPeople.slice()
    const targetId = parseInt(event.currentTarget.id)

    if ( targetId === this.state.playerTarget.id ) {
      copyPlayerPeople.forEach((person) => { 
        if ( person.id !== targetId ){
          person.inPlay = false
        }
      })
      const newPlayerPeopleInPlay = countPeopleInPlay(copyPlayerPeople)

      this.setState({
        playerPeople: copyPlayerPeople,
        playerPeopleInPlay: newPlayerPeopleInPlay,
      })
      this.checkWin()

    } else {
      copyPlayerPeople.forEach((person) => { 
        if ( person.id === targetId ){
          person.inPlay = false
        }
      })
      const newPlayerPeopleInPlay = countPeopleInPlay(copyPlayerPeople)

      this.setState({
        playerPeople: copyPlayerPeople,
        playerPeopleInPlay: newPlayerPeopleInPlay
      })
      this.checkWin()
    }
  }

  checkWin(){
    if ( this.appPeopleInPlay === 1 ){
      console.log('checkWin app has 1 in play')
      this.setState({winnerText: "Opponent wins!"})
      setTimeout(() => { this.handleWin() }, 3000)
    }
    if ( this.playerPeopleInPlay === 1 ){
      console.log('checkWin player has 1 in play')
      this.setState({winnerText: "You win!"})
      setTimeout(() => { this.handleWin() }, 3000)
    }
    else {
      if ( this.playerTurn ){ 
        console.log('checkWin player turn true')
        // this.setState({playerTurn: false})
        setTimeout(() => { this.handleAppQuestion() }, 3000)
      } 
      if ( !this.playerTurn ){
        console.log('checkWin player turn', this.state.playerTurn)
        // this.setState({playerTurn: true})
        setTimeout(() => { this.handleTransition() }, 3000)
      }
    }
  }

  handleWin(){
    this.setState({infoState: 3})
  }

  handleQuestion(event){
    const question = this.state.questions[event.currentTarget.id]

    this.setState({
      currentQuestion: question,
      infoState: 1
    })

    setTimeout(() => { this.handleAnswer(event) }, 3000)
  }

  handleAnswer(event){
    const copyPlayerPeople = this.state.playerPeople.slice()
    const question = this.state.currentQuestion
    let answer = ""

    //if question and target MATCH, answer 'yes' and eliminate those WITHOUT characteristic
    if ( this.state.playerTarget.characteristics[question.characteristic] === question.value ){
      answer = "Yes"
      copyPlayerPeople.forEach((person) => { 
        if ( person.characteristics[question.characteristic] !== question.value ){
          person.inPlay = false
        }
      })
    }
    //if question and target DO NOT MATCH, answer 'no' and eliminate those WITH characteristic
    if ( this.state.playerTarget.characteristics[question.characteristic] !== question.value ){
      answer = "No"
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
      currentAnswer: answer,
      infoState: 2
    })
    console.log('playerTurn in handleAnswer', this.state.playerTurn)
    this.checkWin()
  }

  handleAppQuestion(){
    console.log('in handleAppQuestion')
    const copyAppQuestions = this.state.appQuestions.slice()
    const question = getRandomItem(copyAppQuestions)
    copyAppQuestions.splice(question.id, question.id + 1)

    this.setState({
      appQuestions: copyAppQuestions,
      currentQuestion: question,
      currentAnswer: "",
      infoState: 1
    })

    setTimeout(() => { this.handleAppAnswer() }, 3000)
  }

  handleAppAnswer(){
    const copyAppPeople = this.state.appPeople.slice()
    const question = this.state.currentQuestion
    let answer = ""

    //if question and target MATCH, answer 'yes' and eliminate those WITHOUT characteristic
    if ( this.state.appTarget.characteristics[question.characteristic] === question.value ){
      answer = "Yes"
      copyAppPeople.forEach((person) => { 
        if ( person.characteristics[question.characteristic] !== question.value ){
          person.inPlay = false
        }
      })
    }
    //if question and target DO NOT MATCH, answer 'no' and eliminate those WITH characteristic
    if ( this.state.appTarget.characteristics[question.characteristic] !== question.value ){
      answer = "No"
      copyAppPeople.forEach((person) => {
        if ( person.characteristics[question.characteristic] === question.value){
          person.inPlay = false
        }
      })
    }

    const newAppPeopleInPlay = countPeopleInPlay(copyAppPeople)

    this.setState({
      appPeople: copyAppPeople,
      appPeopleInPlay: newAppPeopleInPlay,
      currentAnswer: answer,
      infoState: 2
    })
    this.checkWin()
  }

  handleTransition(){
    this.setState({
      currentQuestion: {},
      currentAnswer: "",
      infoState: 0
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
          hide={this.state.infoState !== 0 ? 'hide' : ''}
          questions={this.state.questions} 
          onQuestionClick={this.handleQuestion}
        />
        <QuestionInfoContainer
          hide={this.state.infoState !== 1 ? 'hide' : ''}
          question={this.state.currentQuestion} 
        />
        <AnswerInfoContainer
          hide={this.state.infoState !== 2 ? 'hide' : ''}
          answer={this.state.currentAnswer}
        />
        <WinInfoContainer
          hide={this.state.infoState !== 3 ? 'hide' : ''}
          winnerText={this.state.winnerText}
        />
      </div>
    )
  }
}

export default GameContainer