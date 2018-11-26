/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gamePlaying,previousRoll;

const nextPlayer = () => {
    document.querySelector('#current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

};

const gameReset = () => {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousRoll = [];

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

gameReset();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        let dice = Math.floor(Math.random() * 6) + 1;
        previousRoll.push(dice);

        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice === 1) {
            nextPlayer();
        } else if (previousRoll[previousRoll.length-2] === 6 && dice === 6) {
            document.getElementById('score-' + activePlayer).textContent = '0';
            scores[activePlayer] = 0;
            nextPlayer();
        } else {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    let input = document.querySelector('.final-score').value;
    let winingScore;

    if(input){
        winingScore = input;
    } else {
        winingScore = 100;
    }

    if (scores[activePlayer] < winingScore) {
        nextPlayer();
    } else {
        gamePlaying = false;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    }

});

document.querySelector('.btn-new').addEventListener('click', gameReset);