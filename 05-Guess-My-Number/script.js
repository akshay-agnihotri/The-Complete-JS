'use strict';
const checkBtn = document.querySelector('.check');
const input = document.querySelector('.guess');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const again = document.querySelector('.again');
const message = document.querySelector('.message');
const main = document.querySelector('main');
const header = document.querySelector('header');

// generating a random number
function randomNumber() {
  let num = Math.floor(Math.random() * 19) + 1; //generation a num b/w [1,20]
  return num;
}
let randomNum = randomNumber();
// console.log(randomNum);

// checkBtn.onClick() = function(){
//     let inputValue = input.value;
//     if(randomNum === inputValue) {
//         message.innerText = `${inputValue} is correct✅`;
//         main.style.background = 'rgba(13, 220, 13, 0.756)';
//         header.style.background = 'rgba(13, 220, 13, 0.756)';
//         number.innerText = `${inputValue}`;
//     }
//     else {
//         message.innerText = `${inputValue} is incorrect❌ Guess again`;
//         score.innerText = `${score.innerText} - 1`;
//     }
// }

checkBtn.addEventListener('click', checkBtn_function);

function checkBtn_function() {
  
  let inputValue = input.value; //acessing the input value

  if (!inputValue) {
    message.innerText = '⛔ No Number'; //click on btn despite having empty input field
  }

  input.value = ''; //on every click on Btn we will empty the input field

  if (randomNum === parseInt(inputValue)) {
    message.innerText = `🥳 correct answer...`;
    main.style.background = 'rgba(13, 220, 13, 0.756)';
    header.style.background = 'rgba(13, 220, 13, 0.756)';
    number.innerText = `${inputValue}`;
    if (parseInt(score.innerText) > parseInt(highScore.innerText)) {
      highScore.innerText = score.innerText;
    }
    checkBtn.removeEventListener('click', checkBtn_function); //Game Finshised => removing the Event listener from btn(check) 
  } else if (randomNum >= parseInt(inputValue)) {
    message.innerText = `📈 Too Low...`;
    score.innerText = `${parseInt(score.innerText) - 1}`;
  } else if (randomNum <= parseInt(inputValue)) {
    message.innerText = `📉 Too high`;
    score.innerText = `${parseInt(score.innerText) - 1}`;
  }

}

again.addEventListener('click', () => {
  number.innerText = '?';
  score.innerText = '20';
  main.style.background = '#333';
  header.style.background = '#333';
  randomNum = randomNumber();
  // console.log(randomNum); // updating the randomnum on every click of again btn
  checkBtn.addEventListener('click', checkBtn_function);
  message.innerText = 'Start guessing...';

});
