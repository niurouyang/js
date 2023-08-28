
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};         

updateScore();
document.body.addEventListener('keydown',(event)=>{
     if (event.key ==='r'){
        playGame('rock');
     }else if(event.key ==='p'){
        playGame('paper');
     } else if(event.key ==='s'){
        playGame('scissors');
     }

});

function pickComputerMove(){

const randoNumber = Math.random();                
    if (randoNumber >=0 && randoNumber < 1/3){
        computerMove='rock';
    } else if(randoNumber>= 1/3 && randoNumber <2/3){
        computerMove='paper';
    } else {
        computerMove='scissors';;
    }
    console.log(computerMove);
    return computerMove;
}

function playGame(yourPlay){
    const computerMove = pickComputerMove();
    let result = '';
    if (computerMove === yourPlay){
        result  = 'Tie.';
        score.ties +=1 ;
    } else if (computerMove ==='paper'){
        if (yourPlay === 'rock'){
            result = 'You lose.';
            score.losses +=1;
        } else {
            result = 'You Win.';
            score.wins +=1;
        }
    } else if (computerMove === 'rock'){
        if (yourPlay ==='paper'){
            result = 'You Win.';
            score.wins +=1;
        } else {
            result = 'You Lose.';
            score.losses +=1;
        }
    } else{
        if (yourPlay ==='paper'){
            result = 'You Lose.';
            score.losses +=1;
        } else {
            result = 'You Win.';
            score.wins +=1;
        }
    }

    document.querySelector('.whoWin').innerHTML = result;
    document.querySelector('.cMoveyMove').innerHTML = `You<img src="${yourPlay}.png" class="img"><img src="${computerMove}.png" class="img">Computer`;
    updateScore();
    localStorage.setItem('score',JSON.stringify(score));
    }

    function updateScore(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoplay = false;
let intervalId;

function autoPlay(){
    if(!isAutoplay){
        intervalId = setInterval(()=>{
        const yourPlay= pickComputerMove();
        playGame(yourPlay);
        }, 1000);
        isAutoplay =true;
        document.querySelector('.js-autoplay-button').innerHTML = 'Stop play';
    } else {
        clearInterval(intervalId);
        // stop interval with it's ID
        isAutoplay =false;
        document.querySelector('.js-autoplay-button').innerHTML='Auto play';
    }
}

const rockButtonEvent = document.querySelector('.rock-button');
const paperButtonEvent = document.querySelector('.paper-button');
const scissorButtonEvent =document.querySelector('.scissors-button');


rockButtonEvent.addEventListener('click', () =>{
    playGame('rock');
});
paperButtonEvent.addEventListener('click', () =>{
    playGame('paper');
});
scissorButtonEvent.addEventListener('click', () =>{
    playGame('scissors');
});
