let start = document.querySelector(".startMenu");
let startButton = document.querySelector(".startButton");
let resetButton = document.querySelector(".restart");
let grid = document.querySelector(".cardGrid");
let count = 0;
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let delay = 2200;

function reStart(e) {
  if (e.target === resetButton) {
    location.reload(true);
  }
}

function handleStart(e) {
  if (e.target === startButton) {
    e.target.parentNode.remove();
  }

  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

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

  let gameGrid = cardsArray.concat(cardsArray);
  gameGrid.sort(() => 0.5 - Math.random());

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

  grid.addEventListener("click", function(e) {
    console.log(e.target.className);
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

  const match = () => {
    let selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
      card.classList.add("match");
    });
  };
  const resetGuesses = () => {
    firstGuess = "";
    secondGuess = "";
    count = 0;

    let selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
      card.classList.remove("selected");
    });
  };
}

startButton.addEventListener("click", handleStart);
resetButton.addEventListener("click", reStart);
