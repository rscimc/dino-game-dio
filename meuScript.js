const dino = document.querySelector(".dino");
const back = document.querySelector(".container");

let isJumping = false;
let position = 1;

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 10) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 1) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 1.25;
          dino.style.bottom = position + "rem";
        }
      }, 30);
    }
    position += 1.25;
    dino.style.bottom = position + "rem";
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 70;
  let randomTime = Math.random() * 3000;

  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "rem";
  back.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -3.75) {
      clearInterval(leftInterval);
      back.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 3.75 && position < 3.75) {
      clearInterval(leftInterval);
      document.body.innerHTML = "<h1 class='game-over'>Fim de Jogo<h1>";
    } else {
      cactusPosition -= 1;
      cactus.style.left = cactusPosition + "rem";
    }
  }, 40);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keyup", handleKeyUp);
