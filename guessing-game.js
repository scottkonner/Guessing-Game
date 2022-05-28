const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

// Version 1.0 //

// Check changelogs for patch notes


let secretNumber;
let limit = 5
let max;
let min;

rangeFinder()

function rangeFinder(){
  console.log('Welcome to the guessing game!');
  rl.question('Set your max number: ', (max)=> {
      rl.question('Set your minimum number: ', (min)=>{
        secretNumber = randomize(min, max)
        numGuesses(min, max)
        })
    })
}

function randomize(min, max){
    const upper = max - min
    return Number(min + Math.floor(Math.random() * (upper + 1)))
}


function numGuesses(min, max){
  let easyLimit = ((max - min) / 4).toFixed(0)
  let mediumLimit = ((max - min) / 5).toFixed(0)
  let hardLimit = ((max - min) / 8).toFixed(0)
  const arr1 = [1, [1], 'easy', 'Easy',]
  const arr2 = [2, [2], 'medium', 'Medium',]
  const arr3 = [3, [3], 'hard', 'Hard',]

  console.log('')
  console.log('Please select your number of guesses.')
  console.log('')
  console.log(`[1]:  Easy - ${easyLimit}`)
  console.log('')
  console.log(`[2]:  Medium - ${mediumLimit}`)
  console.log('')
  console.log(`[3]:  Hard - ${hardLimit}`)
  rl.question('Your selection? : ', (input)=> {
    if (arr1.includes(input)){
      limit = easyLimit
    }
    if (arr2.includes(input)){
      limit = mediumLimit
    }
    if (arr3.includes(input)){
      limit = hardLimit
    }
    console.log('')
    console.log(`I'm thinkin' of a number  between ${min} and ${max}, and you got 5 guesses...`)
    askGuess()
  })
}

function askGuess() {
  rl.question(`Guess the number, pard'ner : `, (guess) => {
    const check = checkGuess(Number(guess))
    if (check){
      console.log('');
      console.log(`You're right, ${guess} was the number!`);
      console.log('');
      rl.close()
    } else {
        limit --
        if (limit !== 0){
          askGuess()
        } else {
          console.log(`YOU LOSE!  The correct number was ${secretNumber}.`)
          console.log('Better luck next time!')
          rl.close()
        }
      }
    })
}

const checkGuess = function(guess){
    let input = Number(guess)
  if (input > secretNumber){
    console.log('');
    console.log('Too high!');
    if((limit - 1) !== 1){
      console.log(`You have ${limit-1} guesses left.`)
      console.log('')
    } else {
      console.log(`You have ${limit-1} guess left.`)
      console.log('')
    }
    return false
  }
  if (input < secretNumber){
    console.log('');
    console.log('Too low!');
    if((limit - 1) !== 1){
      console.log(`You have ${limit-1} guesses left.`)
      console.log('')
    } else {
      console.log(`You have ${limit-1} guess left.`)
      console.log('')
    }
    return false
  }

  if (input === secretNumber){
    return true
  }

}
