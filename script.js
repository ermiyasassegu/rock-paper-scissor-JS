const game = () => {

const playBtn = document.querySelector(".intro button");
const replay = document.querySelector('.replay')
const roundResult = document.querySelector('#round-result')
const match = document.querySelector('.match')
const introScreen = document.querySelector(".intro");
const hands = document.querySelectorAll(".hands img");
const options = document.querySelectorAll(".options button");
let pScore = 0;
let cScore = 0;
let record = []


//start the game
const gameStart = () => {
    introScreen.classList.add("fadeOut");
    match.classList.remove("fadeOut");
    match.classList.add("fadeIn"); 
    for (const hand of hands) {
        hand.addEventListener("animationend", () => {
            hand.style.animation = "";
        });
    };
}

/**
 * Event handler for play button in the first loaded, while clicking the button
 * it calls playMatch function to hide intro screen and show the match
 */
playBtn.addEventListener("click", () => {
   gameStart()    
});

//play match
const playMatch = () => {

    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const computerOptions = ['rock', 'paper', 'scissors'];

    for (const option of options) {

        option.addEventListener("click", () => {

            playerHand.src = './images/rock.png';
            computerHand.src = './images/rock.png';
            buttonDisable(true, options)
            // computer choice
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber];

            setTimeout(() => {
                //compare hands for player and computer
                compareHands(option.textContent, computerChoice);
                // update image
                playerHand.src = `./images/${option.textContent}.png`;
                computerHand.src = `./images/${computerChoice}.png`;
                console.log('records', record)
            /*First Check if there's a consecutive winner
             *Conditionally checks if there's a winner who won 10times 
             * Enables option button to allow player pick it's option.*/
                const consWinner = checkInARow(3)
                if (consWinner) {
                    setroundResult(consWinner)
                } else if (pScore === 10) {
                    setroundResult('Player wins')
                } else if (cScore === 10) {
                    setroundResult('Computer wins');
                }
                buttonDisable(false, options)
            }, 2000);
            // Animation
            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";
        });
    };

/*
 * replay button event handler and resets score counters, winner log, score section and hand animation.
 */
const replayBtn = document.querySelector(".replay button")
replayBtn.addEventListener("click", () => {
    introScreen.classList.remove("fadeOut");
    introScreen.classList.add("fadeIn");
    replay.classList.remove("fadeIn");
    replay.classList.add("fadeOut");
    playerHand.src = './images/rock.png';
    computerHand.src = './images/rock.png';
    pScore = 0;
    cScore = 0;
    record = []
    updateScore()
    for (const hand of hands) {
        hand.style.animation = "";
    }
});


 //Updates the current score 
 
const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
};

/*
 *  item selected by the computer and player
 */
const compareHands = (playerChoice, computerChoice) => {
    // update text
    const winner = document.querySelector(".winner");
    if (playerChoice === computerChoice) {
        winner.textContent = "It is a tie";
        record.push('t');
        return;
    }
    // check for Rock
    if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
            winner.textContent = "Player wins";
            record.push('p');
            pScore++;
            updateScore();
            return;
        } else {
            winner.textContent = "Computer wins";
            record.push('c');
            cScore++;
            updateScore();
            return;
        }

    }
    // check for paper
    if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
            winner.textContent = "Computer wins";
            record.push('c');
            cScore++;
            updateScore();
            return;
        } else {
            winner.textContent = "player wins";
            record.push('p');
            pScore++;
            updateScore();
            return;
        }

    }
    // check for scissors
    if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
            winner.textContent = "Computer wins";
            record.push('c');
            cScore++;
            updateScore();
            return;
        } else {
            winner.textContent = "Player wins";
            record.push('p');
            pScore++;
            updateScore();
            return;
        }

    }

};


 //Enable or disable option buttons
 
const buttonDisable = (value, options) => {
    for(const option of options) {
        option.disabled = value;
        option.setAttribute('style', 'cursor: default')
    }
}

 //round result, hides match div and display replay view.
 
const setroundResult = (text) => {
    roundResult.textContent = text
    match.classList.remove("fadeIn");
    match.classList.add("fadeOut");
    replay.classList.remove("fadeOut");
    replay.classList.add("fadeIn");
}


 //  comparing the last three winCount logs
 
const checkInARow= (winCount) => {
    if(record.length < winCount) {
        return false;
    } else {
        const last = record[record.length -1]

        const itemComparedLogs = record.slice(record.length - winCount)
        console.log('last three log', itemComparedLogs);
        let counter = 0;
        for(const win of itemComparedLogs) {
            if (win === last) {
                counter++;
            }
        }
        if (counter === winCount && last === 'c') {
            return winCount  + 'wins in a row for computer'
        } else if (counter === winCount &&  last === 'p') {
            return winCount  + 'wins in a row for Player'
        } else {
            return false;
        }
    }
  }
}

playMatch();

};

game();
consol.log('sada');
