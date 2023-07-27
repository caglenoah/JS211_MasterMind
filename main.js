'use strict';
let colors = require('colors');

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


console.log('inputs', `${letters.join(', ')}`.rainbow);

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(`attempt # ${i+1}: `.bold.underline, board[i].cyan)
  }
}

//generates a solution
const generateSolution = () => {
  //randomly pick 4 letter from array
  //avoid being able to add duplicate letters
  solution = solution.split('');
  while (solution.length < 4) {
    let randomIndex = Math.floor(Math.random() * (0 - letters.length)) + letters.length;

    if (!solution.includes(letters[randomIndex])) {
      solution.push(letters[randomIndex]);
    }
  }

  solution = solution.join('');
}







//generates a solution
// const generateSolution = () =>  {
//   for (let i = 0; i < 4; i++) {
//     const randomIndex = getRandomInt(0, letters.length);
//     solution += letters[randomIndex];
//   }
//   }






// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

const generateHint = guess =>  {
  console.log('=== solution:', solution);
  let correctLetterAndLocation = 0;
  let correctLetterAndNotLocation = 0;
  let indexOfCorrectLetterAndLocation;
  let indexOfCorrectLetterAndWrongLocation;
  

  let solutionArray = solution.split('');
  let guessArray = guess.split('');

solutionArray.forEach((letter, index) => {
    if (letter === guessArray[index] && index === guessArray.indexOf(letter)) {
       /** in this section find if letter from solutionArray exists in guessArray AND their position (index) is the same */
       // console.log('index:', guessArray.indexOf(letter));
       // console.log('letter:', letter);
       // console.log(`Correct letter and its location: ${letter}`.red);
       indexOfCorrectLetterAndLocation = index;
       correctLetterAndLocation++;
    //   solutionArray[index] = null;
    }

    if (guessArray.includes(letter) && index !== guessArray.indexOf(letter)) {
       /** in this section find if letter from solutionArray exists in guessArray BUT their position (index) is NOT the same */
       // console.log(`Correct letter but not its location: ${letter}`.yellow);
       indexOfCorrectLetterAndWrongLocation = index;
       correctLetterAndNotLocation++;
    //   solutionArray[index] = null;
    }
  });
 
  //calls variable
  board.push(`Your guess is: ${guess}. Correct Letters and Locations: ${correctLetterAndLocation}. Correct Letters and Not Locations: ${correctLetterAndNotLocation}`);
  return `${correctLetterAndLocation}-${correctLetterAndNotLocation}`;
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (solution === guess) {
    console.log('You guessed it!'.green, `hit"ctrl + C" to start a new game`)
    return 'you guessed it!'
  };
  if (board.length === 10) {
    console.log(`You ran out of turns! The solution was: `.red, solution.rainbow, '. Hit "Ctrl+C" to start a new game.');
    return false;
  } else {
    generateHint(guess)
  };
}


const getPrompt = () =>  {
  rl.question('enter your guess:'.underline, (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'you guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => { 
      board = [];
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      board = [];
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}