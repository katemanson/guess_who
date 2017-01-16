const appPeopleData = [
  {
    characteristics: {
      name: "Joe",
      gender: "male"
    },
    inPlay: true
  },
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

const playerPeopleData = [
  {
    characteristics: {
      name: "Joe",
      gender: "male"
    },
    inPlay: true
  },
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
      text: "Are they male?"
    },
    {
      characteristic: "gender",
      value: "female",
      text: "Are they female?"
    }
  ]

const getRandomItem = (array) => {
  const randomIndex = Math.floor(Math.random()*array.length)
  const randomItem = array[randomIndex]
  randomItem.id = randomIndex
  return randomItem
}
//? ^Better way to do this/place to put this?

const countPeopleInPlay = (peopleArray) => {
  return peopleArray.map(person => person.inPlay)
    .reduce((counter, inPlay) => {
      if ( inPlay ){
        return counter + 1
      }
      else {
        return counter
      }
    }, 0)
}
//? ^Better way to do this/place to put this?

class Game {
  constructor(){
    //TODO: Figure out how to avoid 'double data' for appPeople, playerPeople (i.e. how to deep copy)
    this.appPeople = appPeopleData
    this.playerPeople = playerPeopleData
    this.appTarget = getRandomItem(appPeopleData)
    console.log('appTarget', this.appTarget)
    this.playerTarget = getRandomItem(playerPeopleData)
    console.log('playerTarget', this.playerTarget)
    this.appPeopleInPlay = countPeopleInPlay(this.appPeople)
    this.playerPeopleInPlay = countPeopleInPlay(this.playerPeople)
    this.playerTurn = true
    this.questions = questionData
  }
}

export {Game as default, countPeopleInPlay, getRandomItem}