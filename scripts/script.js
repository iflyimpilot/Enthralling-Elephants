//declaration of variables used
let start = document.querySelector(".startMenu");
let startButton = document.querySelector(".startButton");
let resetButton = document.querySelector(".restart");
let grid = document.querySelector(".cardGrid");
let count = 0;
let correct = 0;
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let delay = 1400;
let paused = false; //Timer pause

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}
const startMusic = new sound("../audio/gametheme.mp3");
const startSound = new sound("../audio/startSound.mp3");
const gameMusic = new sound("../audio/remix.mp3");
const winMusic = new sound("../audio/Eye.mp3");
function startStartMusic() {
  startMusic.play();
}
function startMusicEnd() {
  startMusic.stop();
}
function startGameMusic() {
  gameMusic.play();
}
function startGameMusicEnd() {
  gameMusic.stop();
}
function startStartSound() {
  startSound.play();
}
function startWinMusic() {
  winMusic.play();
}

startStartMusic();
//the below function makes the reset button reload the page
function reStart(e) {
  if (e.target === resetButton) {
    location.reload(true);
  }
}

// the following function is basically the whole game as it runs
function handleStart(e) {
  startMusicEnd();
  startStartSound();
  setTimeout(startGameMusic, 2000);

  if (e.target === startButton) {
    e.target.parentNode.remove();
  } else {
    gameGrid = "";
  }

  //TIMER element scripts
  let minutesLabel = document.getElementById("minutes");
  let secondsLabel = document.getElementById("seconds");
  let totalSeconds = 0;

  setInterval(setTime, 1000);

  function setTime() {
    if (paused === false) {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
  }

  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
  //^TIMER

  // below is setting up the properties of each card organized into an array
  const cardsArray = [
    {
      name: "mushroom",
      img: "img/mushroom.png"
    },
    {
      name: "Flower",
      img: "img/flower.png"
    },
    {
      name: "Star",
      img: "img/Star.png"
    },
    {
      name: "coin",
      img: "img/coin.png"
    },
    {
      name: "leaf",
      img: "img/leaf.png"
    },
    {
      name: "1Up",
      img: "img/_1Up.png"
    },
    {
      name: "bell",
      img: "img/bell.png"
    },
    {
      name: "Shine",
      img: "img/shine.png"
    },
    {
      name: "shell",
      img: "img/shell.png"
    }
  ];

  // below will add a copy of 'cardsArray' to the array and randomize their order
  let gameGrid = cardsArray.concat(cardsArray);
  gameGrid.sort(() => 0.5 - Math.random());

  //below will create <div> elements with the properties of each card from the array
  gameGrid.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    card.style.backgroundImage = `url(${item.img})`;
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

  //below the first if statement 'listens' for a click on the game page or a previously selected card and makes nothing change. We needed this because the whole game would flip or a card would not allow itself to be targeted in the next round of guessing. The second if statement is a simple counter of how many guesses have been made and maxs it to 2 cards shown at a time. The third if statement checks the name of the first guess to the name of the second guess and decides if its a match. Then it decides what to do with the card after the guess whether its a match or not.
  grid.addEventListener("click", function(e) {
    if (
      e.target.tagName === "SECTION" ||
      e.target.className === "card selected" ||
      e.target === previousTarget
    ) {
      return;
    }
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = e.target.parentNode.dataset.name;
        e.target.parentNode.classList.add("selected");
        previousTarget = e.target;
      } else {
        secondGuess = e.target.parentNode.dataset.name;
        e.target.parentNode.classList.add("selected");
        previousTarget = null;
      }

      if (firstGuess !== "" && secondGuess !== "") {
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);
        } else {
          setTimeout(resetGuesses, delay);
        }
      }
    }
  });
  //below will count the number of matches and when the number gets to nine it will trigger the final win game screen
  const match = () => {
    correct++;
    if (correct >= 9) {
      startGameMusicEnd();
      startWinMusic();
      paused = true;

      const finish = document.createElement("div");
      finish.classList.add("finishImgBlock");
      const youWin = document.createElement("div");
      youWin.classList.add("youWin");

      const finishImg = document.createElement("div");
      finishImg.classList.add("finishImg");
      document.querySelector("footer").classList.add("finish");
      finish.appendChild(youWin);
      finish.appendChild(finishImg);
      document.querySelector("footer").append(finish);
    }
    let selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
      card.classList.add("match");
    });
  };
  //below will remove the 'selected' class from the two cards that were revealed if they didnt match. this will cause them to return to their 'hidden' state by flipping back over
  const resetGuesses = () => {
    firstGuess = "";
    secondGuess = "";
    count = 0;

    let selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
      const returnCard = () => {
        card.classList.remove("return");
      };
      card.classList.add("return");
      card.classList.remove("selected");
      setTimeout(returnCard, 700);
    });
  };
}
//these two are the 'listeners' that will initiate the start of the game and the reset button when clicked. note: these are not included in the handleStart function but they MUST come after it for them to work.
startButton.addEventListener("click", handleStart);

resetButton.addEventListener("click", reStart);
