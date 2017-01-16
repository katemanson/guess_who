const peopleData = [
  // {
  //   characteristics: {
  //     name: "Joe",
  //     gender: "male"
  //   },
  //   inPlay: true
  // },
  {
    characteristics: {
      name: "Jen",
      gender: "female"
    },
    inPlay: true
  },
  {
    characteristics: {
      name: "Jeff",
      gender: "male"
    },
    inPlay: true
  },
  {
    characteristics: {
      name: "Jess",
      gender: "female"
    },
    inPlay: true
  }
]

const questionData = [
    {
      characteristic: "gender",
      value: "male",
      text: "Male?"
    },
    {
      characteristic: "gender",
      value: "female",
      text: "Female?"
    }
  ]

const getRandomPerson = (peopleArray) => {
  const randomIndex = Math.floor(Math.random()*peopleArray.length)
  const randomPerson = peopleArray[randomIndex]
  randomPerson.id = randomIndex
  return randomPerson
}
//? ^Better way to do this/place to put this?

const countPeopleInPlay = (peopleArray) => {
  return peopleArray.map(person => person.inPlay)
  .reduce((counter, inPlay) => {
    if ( inPlay ){
      counter++
    }
    return counter
  }, 0)
}
//? ^Better way to do this/place to put this?

class Game {
  constructor(){
    this.appPeople = peopleData.slice()
    this.playerPeople = peopleData.slice()
    this.appTarget = getRandomPerson(peopleData)
    console.log('appTarget', this.appTarget)
    this.playerTarget = getRandomPerson(peopleData)
    console.log('playerTarget', this.playerTarget)
    this.appPeopleInPlay = countPeopleInPlay(this.appPeople)
    this.playerPeopleInPlay = countPeopleInPlay(this.playerPeople)
    this.playerTurn = true
    this.questions = questionData
  }
}

export {Game as default, countPeopleInPlay}