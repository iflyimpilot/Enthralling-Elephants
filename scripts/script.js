var start = document.querySelector(".startMenu");
var startButton = document.querySelector(".startButton");
var grid = document.querySelector(".cardGrid");
let count = 0;
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let delay = 2200;
function handleStart(e) {
  if (e.target === startButton) {
    e.target.parentNode.remove();
    // timerStatus = true;
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
      if (e.target.parentNode === "section" || e.target === previousTarget) {
        return;
      }
      if (count < 2) {
        count++;
        if (count === 1) {
          firstGuess = e.target.parentNode.dataset.name;
          e.target.parentNode.classList.add("selected");
        } else {
          secondGuess = e.target.parentNode.dataset.name;
          e.target.parentNode.classList.add("selected");
        }

        if (firstGuess !== "" && secondGuess !== "") {
          if (firstGuess === secondGuess) {
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
          } else {
            setTimeout(resetGuesses, delay);
          }
          previousTarget = e.target;
        }
      }
    });

    const match = () => {
      var selected = document.querySelectorAll(".selected");
      selected.forEach(card => {
        card.classList.add("match");
      });
    };
    const resetGuesses = () => {
      firstGuess = "";
      secondGuess = "";
      count = 0;

      var selected = document.querySelectorAll(".selected");
      selected.forEach(card => {
        card.classList.remove("selected");
      });
    };
  }
}
start.addEventListener("click", handleStart);
