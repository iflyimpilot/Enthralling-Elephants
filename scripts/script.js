function handleStart(e) {
  e.target.parentNode.remove();
}

document.querySelector(".startMenu").addEventListener("click", handleStart);
